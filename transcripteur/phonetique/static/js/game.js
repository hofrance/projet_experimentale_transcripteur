document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const explanationDisplay = document.getElementById('explanation');
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');
    const questionSound = document.getElementById('question-sound');
    const restartButton = document.getElementById('restart-button');
    const pauseButton = document.getElementById('pause-button');
    let score = 0;
    let currentIndex = 0;
    let timeLeft = 60; // 60 seconds for the game
    let isPaused = false;
    let timerInterval;
    const uniqueWords = getUniqueWords();

    displayNextWord();
    startTimer();

    restartButton.addEventListener('click', restartGame);
    pauseButton.addEventListener('click', togglePause);

    function createCard(word) {
        const card = document.createElement('div');
        card.className = 'shadow rounded p-4 m-2 transition-transform transform hover:scale-105';
        const wordTitle = document.createElement('h3');
        wordTitle.className = ' text-lg font-bold mb-4';
        wordTitle.textContent = word.word;
        card.appendChild(wordTitle);

        word.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded m-1';
            button.textContent = option;
            button.onclick = () => handleOptionClick(index, word.answerIndex, card, word.explanation);
            card.appendChild(button);
        });

        return card;
    }

    function handleOptionClick(selectedIndex, correctIndex, card, explanation) {
        if (isPaused) return;

        const allButtons = card.querySelectorAll('button');
        allButtons.forEach(button => button.disabled = true);

        if (selectedIndex === correctIndex) {
            card.classList.add('correct');
            score++;
            correctSound.play();
        } else {
            card.classList.add('incorrect');
            incorrectSound.play();
        }

        explanationDisplay.textContent = explanation;
        explanationDisplay.classList.remove('hidden');

        setTimeout(() => {
            currentIndex++;
            if (currentIndex < uniqueWords.length) {
                displayNextWord();
                explanationDisplay.classList.add('hidden');
            } else {
                endGame();
            }
            scoreDisplay.textContent = `Score : ${score}`;
        }, 10000); // Display explanation for 3 seconds
    }

    function displayNextWord() {
        if (isPaused) return;

        if (currentIndex < uniqueWords.length) {
            const currentWord = uniqueWords[currentIndex];
            const card = createCard(currentWord);
            gameContainer.innerHTML = '';
            gameContainer.appendChild(card);
            questionSound.play();
        }
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            if (isPaused) return;

            timeLeft--;
            timerDisplay.textContent = `Temps restant : ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function restartGame() {
        clearInterval(timerInterval);
        score = 0;
        currentIndex = 0;
        timeLeft = 60;
        isPaused = false;
        scoreDisplay.textContent = `Score : ${score}`;
        timerDisplay.textContent = `Temps restant : ${timeLeft}s`;
        explanationDisplay.classList.add('hidden');
        displayNextWord();
        startTimer();
    }

    function togglePause() {
        isPaused = !isPaused;
        if (isPaused) {
            pauseButton.textContent = 'Reprendre';
        } else {
            pauseButton.textContent = 'Pause';
            displayNextWord();
        }
    }

    function endGame() {
        gameContainer.innerHTML = `<div class='text-center text-xl font-semibold'>Le jeu est terminé ! Votre score : ${score}</div>`;
        clearInterval(timerInterval);
    }
});
