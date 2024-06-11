from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
from django.conf import settings
import os
import logging
import speech_recognition as sr
import epitran
import platform
import subprocess
from .fonctions import formater_phonetique, post_traitement_phonetique_avance

logger = logging.getLogger(__name__)

def convert_to_wav(input_path):
    output_path = os.path.splitext(input_path)[0] + '_converted.wav'
    command = ['ffmpeg', '-i', input_path, '-acodec', 'pcm_s16le', '-ar', '16000', '-ac', '1', output_path]
    
    try:
        shell = platform.system() == 'Windows'
        result = subprocess.run(command, check=True, stderr=subprocess.PIPE, shell=shell)
        if result.returncode != 0:
            raise subprocess.CalledProcessError(result.returncode, command)
        logger.info(f"Conversion réussie: {input_path} -> {output_path}")
        return output_path
    except subprocess.CalledProcessError as e:
        logger.error(f"Erreur de conversion avec ffmpeg: {e.stderr.decode()}")
        raise RuntimeError(f"Erreur de conversion avec ffmpeg: {e.stderr.decode()}")
    except FileNotFoundError:
        logger.error("ffmpeg n'est pas installé ou n'est pas trouvé dans le PATH.")
        raise RuntimeError("ffmpeg n'est pas installé ou n'est pas trouvé dans le PATH.")

def audio_to_text(audio_file_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file_path) as source:
        audio_data = recognizer.record(source)
        try:
            return recognizer.recognize_google(audio_data, language='fr-FR')
        except (sr.UnknownValueError, sr.RequestError) as e:
            logger.error(f"Erreur de reconnaissance vocale: {str(e)}")
            return None

def convertir_en_phonetique(text):
    epi = epitran.Epitran('fra-Latn')
    return formater_phonetique(post_traitement_phonetique_avance(epi.transliterate(text)))

@csrf_exempt
def transcribe_view(request):
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
                os.remove(full_path)
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

def jeux_view(request):
    return render(request, 'phonetique/game.html')

def home_view(request):
    return render(request, 'phonetique/home.html')

def about_view(request):
    return render(request, 'phonetique/about.html')

def upload_audio():
    pass
