from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings
import os
import logging
import speech_recognition as sr
import epitran
from pydub import AudioSegment
from .fonctions import formater_phonetique, post_traitement_phonetique_avance

logger = logging.getLogger(__name__)

def convert_to_wav(input_path):
    """ Convertit un fichier audio au format WAV en utilisant pydub. """
    output_path = os.path.splitext(input_path)[0] + '_converted.wav'
    
    try:
        audio = AudioSegment.from_file(input_path)
        audio = audio.set_frame_rate(16000).set_channels(1)
        audio.export(output_path, format="wav")
        logger.info(f"Conversion réussie: {input_path} -> {output_path}")
        return output_path
    except Exception as e:
        logger.error(f"Erreur de conversion avec pydub: {str(e)}")
        raise RuntimeError(f"Erreur de conversion avec pydub: {str(e)}")

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
    return formater_phonetique(post_traitement_phonetique_avance(epi.transliterate(text)))

@csrf_exempt
def transcribe_view(request):
    """ Traite les requêtes de transcription pour les entrées audio et textuelles. """
    if request.method == "POST":
        audio_file = request.FILES.get('audio')
        text_input = request.POST.get('text', None)

        if audio_file:
            try:
                audio_path = default_storage.save(os.path.join('audios', os.urandom(16).hex()), audio_file)
                full_path = os.path.join(settings.MEDIA_ROOT, audio_path)
                if not full_path.endswith('.wav'):
                    full_path = convert_to_wav(full_path)
                text_transcription = audio_to_text(full_path)
                transcription = convertir_en_phonetique(text_transcription) if text_transcription else "Erreur lors de la transcription audio."
                os.remove(full_path)  # Supprime le fichier après traitement pour éviter l'encombrement du serveur
                return JsonResponse({'transcription': transcription}, safe=False)
            except RuntimeError as e:
                return JsonResponse({'error': str(e)}, status=500)
        elif text_input:
            transcription = convertir_en_phonetique(text_input)
            return JsonResponse({'transcription': transcription}, safe=False)
        else:
            return JsonResponse({'error': 'Aucune entrée valide fournie'}, status=400)
    else:
        return render(request, 'phonetique/transcribe.html')

@csrf_exempt
def upload_audio(request):
    """ Permet le téléversement et la transcription de fichiers audio. """
    if request.method == "POST":
        audio_file = request.FILES.get('audio')

        if audio_file:
            try:
                audio_path = default_storage.save(os.path.join('audios', os.urandom(16).hex()), audio_file)
                full_path = os.path.join(settings.MEDIA_ROOT, audio_path)
                if not full_path.endswith('.wav'):
                    full_path = convert_to_wav(full_path)
                text_transcription = audio_to_text(full_path)
                transcription = convertir_en_phonetique(text_transcription) if text_transcription else "Erreur lors de la transcription audio."
                os.remove(full_path)  # Supprime le fichier après traitement pour éviter l'encombrement du serveur
                return JsonResponse({'transcription': transcription}, safe=False)
            except RuntimeError as e:
                return JsonResponse({'error': str(e)}, status=500)
        else:
            return JsonResponse({'error': 'Aucun fichier audio fourni'}, status=400)
    else:
        return render(request, 'phonetique/upload_audio.html')

def jeux_view(request):
    """ Affiche la vue du jeu phonétique. """
    return render(request, 'phonetique/game.html')

def home_view(request):
    """ Affiche la vue de la page d'accueil. """
    return render(request, 'phonetique/home.html')

def about_view(request):
    """ Affiche la vue de la page à propos. """
    return render(request, 'phonetique/about.html')
