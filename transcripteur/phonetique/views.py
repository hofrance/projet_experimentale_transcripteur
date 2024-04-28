import os
import subprocess
from django.shortcuts import render
import speech_recognition as sr
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings
import logging
import epitran

# Configuration du logger
logger = logging.getLogger(__name__)

def convert_to_wav(input_path):
    """ Convertit un fichier audio au format WAV. """
    output_path = os.path.splitext(input_path)[0] + '_converted.wav'
    command = ['ffmpeg', '-i', input_path, '-acodec', 'pcm_s16le', '-ar', '16000', '-ac', '1', output_path]
    subprocess.run(command, check=True, stderr=subprocess.PIPE)
    return output_path

def audio_to_text(audio_file_path):
    """ Transcrit l'audio en texte en utilisant l'API de reconnaissance vocale de Google. """
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
        try:
            return recognizer.recognize_google(audio_data, language='fr-FR')
        except (sr.UnknownValueError, sr.RequestError) as e:
            logger.error(f"Erreur de reconnaissance vocale: {str(e)}")
            return None

def convertir_en_phonetique(text):
    """ Convertit le texte en transcription phonétique en utilisant Epitran. """
    epi = epitran.Epitran('fra-Latn')
    return epi.transliterate(text)

@csrf_exempt
def transcribe_view(request):
    """ Traite les requêtes de transcription pour les entrées audio et textuelles. """
    if request.method == "POST":
        audio_file = request.FILES.get('audio')
        text_input = request.POST.get('text', None)

        if audio_file:
            audio_path = default_storage.save(os.path.join('audios', os.urandom(16).hex()), audio_file)
            full_path = os.path.join(settings.MEDIA_ROOT, audio_path)
            if not full_path.endswith('.wav'):
                full_path = convert_to_wav(full_path)
            text_transcription = audio_to_text(full_path)
            transcription = convertir_en_phonetique(text_transcription) if text_transcription else "Erreur lors de la transcription audio."
            os.remove(full_path)  # Supprimer le fichier après traitement pour éviter l'encombrement du serveur
            return JsonResponse({'transcription': transcription}, safe=False)
        elif text_input:
            transcription = convertir_en_phonetique(text_input)
            return JsonResponse({'transcription': transcription}, safe=False)
        else:
            return JsonResponse({'error': 'Aucune entrée valide fournie'}, status=400)
    else:
        # Rendu du template HTML si la requête n'est pas POST
        return render(request, 'phonetique/transcribe.html')

# Vues supplémentaires, le cas échéant, peuvent être définies de manière similaire

def get_cookie(request, name):
    """ Récupère un cookie par son nom. """
    return request.COOKIES.get(name, None)


def jeux_view():
    pass
def upload_audio():
    pass