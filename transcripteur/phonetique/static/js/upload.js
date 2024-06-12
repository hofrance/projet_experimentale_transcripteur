document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const transcriptionResultDiv = document.getElementById('transcriptionResult');
    const transcriptionText = document.getElementById('transcriptionText');
    const alertBox = document.getElementById('alertBox');
    const alertText = document.getElementById('alertText');

    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(uploadForm);

        fetch('/upload_audio/', {
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
                alertText.textContent = data.error || 'Échec de la transcription.';
                alertBox.classList.remove('hidden');
            }
        }).catch(error => {
            alertText.textContent = 'Erreur lors de la transcription : ' + error.message;
            alertBox.classList.remove('hidden');
        });
    });

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
