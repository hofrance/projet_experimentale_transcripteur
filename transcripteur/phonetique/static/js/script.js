document.addEventListener('DOMContentLoaded', function() {
    const transcriptionForm = document.getElementById('transcriptionForm');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const recordingIndicator = document.getElementById('recordingIndicator');
    const transcriptionResultDiv = document.getElementById('transcriptionResult');
    const transcriptionText = document.getElementById('transcriptionText');
    const phoneticAnalysisDiv = document.getElementById('phoneticAnalysis');
    const phoneticAnalysisContent = document.getElementById('phoneticAnalysisContent');
    const alertBox = document.getElementById('alertBox');
    const alertText = document.getElementById('alertText');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const restartButton = document.getElementById('restart-button');
    const pauseButton = document.getElementById('pause-button');
    let mediaRecorder;
    let audioChunks = [];
    let isPaused = false;

    function showLoadingIndicator() {
        loadingIndicator.classList.remove('hidden');
    }

    function hideLoadingIndicator() {
        loadingIndicator.classList.add('hidden');
    }

    function restartForm() {
        transcriptionForm.reset();
        transcriptionResultDiv.classList.add('hidden');
        phoneticAnalysisDiv.classList.add('hidden');
        alertBox.classList.add('hidden');
        audioChunks = [];
        startBtn.disabled = false;
        stopBtn.disabled = true;
        recordingIndicator.style.display = 'none';
        hideLoadingIndicator();
    }

    function togglePause() {
        isPaused = !isPaused;
        pauseButton.textContent = isPaused ? 'Reprendre' : 'Pause';
    }

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
                alertText.textContent = "Aucune donnée audio disponible.";
                alertBox.classList.remove('hidden');
            }
            audioChunks = [];
        };
    });

    transcriptionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        showLoadingIndicator();

        const formData = new FormData(transcriptionForm);
        if (!audioChunks.length) {
            formData.append('text', transcriptionForm.querySelector('[name="text"]').value);
        }

        fetch('/transcribe/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        }).then(response => response.json())
        .then(data => {
            hideLoadingIndicator();
            if (data.transcription) {
                transcriptionText.textContent = data.transcription;
                transcriptionResultDiv.classList.remove('hidden');
                alertBox.classList.add('hidden');
                analyzePhonetic(data.transcription);
            } else {
                alertText.textContent = 'Échec de la transcription ou réponse inattendue du serveur.';
                alertBox.classList.remove('hidden');
            }
        }).catch(error => {
            hideLoadingIndicator();
            alertText.textContent = 'Erreur lors de la transcription : ' + error.message;
            alertBox.classList.remove('hidden');
        });
    });

    function sendAudioAndTextToServer(audioBlob) {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'recording.wav');
        formData.append('text', transcriptionForm.querySelector('[name="text"]').value);

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
                analyzePhonetic(data.transcription);
            } else {
                alertText.textContent = 'Échec de la transcription.';
                alertBox.classList.remove('hidden');
            }
        }).catch(error => {
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

    function analyzePhonetic(transcription) {
        const sounds = {
            labial: { sounds: ["p", "b", "m", "ɱ", "ɸ", "β"], icon: "👄", name: "Labiaux" },
            palatal: { sounds: ["ç", "ʝ", "ɲ", "ʃ", "ʒ", "j"], icon: "👅", name: "Palataux" },
            velar: { sounds: ["k", "g", "ŋ", "x", "ɣ"], icon: "🎤", name: "Vélaires" },
            uvular: { sounds: ["q", "ɢ", "ɴ"], icon: "🎶", name: "Uvulaires" },
            glottal: { sounds: ["ʔ", "h"], icon: "🗣", name: "Glottaux" }
        };

        phoneticAnalysisContent.innerHTML = "";

        Object.keys(sounds).forEach(type => {
            const detectedSounds = transcription.split("").filter(char => sounds[type].sounds.includes(char));
            if (detectedSounds.length > 0) {
                const soundBlock = document.createElement("div");
                soundBlock.classList.add("phonetic-item");

                const soundIcon = document.createElement("div");
                soundIcon.classList.add("phonetic-icon");
                soundIcon.textContent = sounds[type].icon;
                soundBlock.appendChild(soundIcon);

                const soundText = document.createElement("div");
                soundText.innerHTML = `<strong>${sounds[type].name} :</strong> ${detectedSounds.join(", ")}`;
                soundBlock.appendChild(soundText);

                phoneticAnalysisContent.appendChild(soundBlock);
            }
        });

        phoneticAnalysisDiv.classList.remove('hidden');
    }

    restartButton.addEventListener('click', restartForm);
    pauseButton.addEventListener('click', togglePause);
});
