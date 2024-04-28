import os
import subprocess
import speech_recognition as sr

def convert_to_wav(input_path):
    output_path = os.path.splitext(input_path)[0] + '_converted.wav'
    command = ['ffmpeg', '-i', input_path, '-acodec', 'pcm_s16le', '-ar', '16000', '-ac', '1', output_path]
    try:
        subprocess.run(command, check=True, stderr=subprocess.PIPE)
        return output_path
    except subprocess.CalledProcessError as e:
        print(f"Failed to convert file: {e.stderr.decode()}")
        return None

def test_recognition(audio_file_path):
    recognizer = sr.Recognizer()
    if not os.path.exists(audio_file_path):
        print("File not found. Ensure the file path is correct.")
        return

    try:
        with sr.AudioFile(audio_file_path) as source:
            print("Processing audio file...")
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data, language='fr-FR')
            print("Google Speech Recognition thinks you said: " + text)
    except (sr.UnknownValueError, sr.RequestError) as e:
        print(f"Could not process audio data: {e}")
    except ValueError as e:
        print(f"Audio file format error: {e}")
        # Try converting the file if it's not in the correct format
        converted_path = convert_to_wav(audio_file_path)
        if converted_path:
            test_recognition(converted_path)
    except EOFError as e:
        print(f"Unexpected end of file: {e}")

audio_path = "/home/richard/projet/projet_experimentale2/transcripteur/media/recording.wav"
test_recognition(audio_path)
