document.addEventListener('DOMContentLoaded', function() {
    const transcriptionForm = document.getElementById('transcriptionForm');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const audioPlayback = document.getElementById('audioPlayback');
    const transcriptionResultDiv = document.getElementById('transcriptionResult');
    const transcriptionText = document.getElementById('transcriptionText');
    const alertBox = document.getElementById('alertBox');
    const alertText = document.getElementById('alertText');
    const recordingIndicator = document.getElementById('recordingIndicator');
    const inputText = document.getElementById('texte');  // Get the text input
    let mediaRecorder;
    let audioChunks = [];

    startBtn.addEventListener('click', function() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        audioChunks.push(event.data);
                    }
                };
                mediaRecorder.start();
                startBtn.disabled = true;
                stopBtn.disabled = false;
                recordingIndicator.style.display = 'block';
            })
            .catch(err => {
                console.error("Error accessing media devices: ", err);
                alertText.textContent = "Erreur d'accès au micro : " + err.message;
                alertBox.classList.remove('hidden');
            });
    });

    stopBtn.addEventListener('click', function() {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            if (audioChunks.length > 0 && audioChunks[0].size > 0) {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                sendAudioAndTextToServer(audioBlob);
                recordingIndicator.style.display = 'none';
                startBtn.disabled = false;
                stopBtn.disabled = true;
            } else {
                console.error("No audio data available.");
                alertText.textContent = "Aucune donnée audio disponible.";
                alertBox.classList.remove('hidden');
            }
            audioChunks = []; // Clear audio chunks after processing
        };
    });

    transcriptionForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent default form submission

        const formData = new FormData(transcriptionForm);
        formData.append('text', inputText.value);  // Make sure the text input is included

        fetch('/transcribe/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        }).then(response => response.json())
        .then(data => {
            if (data.transcription) {
                transcriptionText.textContent = data.transcription;
                transcriptionResultDiv.classList.remove('hidden');
                alertBox.classList.add('hidden');
            } else {
                alertText.textContent = 'Échec de la transcription ou réponse inattendue du serveur.';
                alertBox.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alertText.textContent = 'Erreur lors de la transcription : ' + error.message;
            alertBox.classList.remove('hidden');
        });
    });

    function sendAudioAndTextToServer(audioBlob) {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav');
        fetch('/transcribe/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        }).then(response => response.json())
        .then(data => {
            if (data.transcription) {
                transcriptionText.textContent = data.transcription;
                transcriptionResultDiv.classList.remove('hidden');
                alertBox.classList.add('hidden');
            } else {
                alertText.textContent = 'Échec de la transcription.';
                alertBox.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alertText.textContent = 'Erreur lors de la transcription : ' + error.message;
            alertBox.classList.remove('hidden');
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});
