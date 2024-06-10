document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById('game-container');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const explanationDisplay = document.getElementById('explanation');
    let score = 0;
    let currentIndex = 0;
    let timeLeft = 60; // 60 seconds for the game
    const uniqueWords = getUniqueWords();

    displayNextWord();
    startTimer();

    function getUniqueWords() {
        const words = [
            {
                word: "arbre",
                options: ["/aʁbʁ/", "/ɑʁb/", "/ɑʁbʁə/", "/aʁ.bʁə/"],
                answerIndex: 0,
                explanation: "Le mot 'arbre' est composé du son guttural /aʁ/ et du son vibré /bʁ/. En API: /aʁbʁ/."
            },
            {
                word: "chat",
                options: ["/ʃa/", "/ʃɑ/", "/ʃat/", "/ʃɑt/"],
                answerIndex: 2,
                explanation: "Le mot 'chat' contient le son chuintant /ʃ/ et le son bref /a/. En API: /ʃat/."
            },
            {
                word: "soleil",
                options: ["/sɔ.lɛj/", "/sɔ.lɛjə/", "/sɔ.lɛj.lə/", "/sɔ.lɛj.jə/"],
                answerIndex: 1,
                explanation: "Le mot 'soleil' contient les sons /sɔ/ et /lɛj/, un mélange de voyelles et de semi-voyelles. En API: /sɔ.lɛjə/."
            },
            // Continuez avec les autres mots...
        ];

        // Utiliser une structure de données Set pour filtrer les doublons
        const wordsSet = new Set();
        const uniqueWords = words.filter(word => {
            const serialized = JSON.stringify([word.word, ...word.options]);
            if (!wordsSet.has(serialized)) {
                wordsSet.add(serialized);
                return true;
            }
            return false;
        });

        shuffleArray(uniqueWords);
        return uniqueWords;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(word) {
        const card = document.createElement('div');
        card.className = 'bg-white shadow rounded p-4 m-2 transition-transform transform hover:scale-105';
        const wordTitle = document.createElement('h3');
        wordTitle.className = 'text-lg font-bold mb-4';
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
        const allButtons = card.querySelectorAll('button');
        allButtons.forEach(button => button.disabled = true);

        if (selectedIndex === correctIndex) {
            card.classList.add('correct');
            score++;
        } else {
            card.classList.add('incorrect');
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
        }, 3000); // Display explanation for 3 seconds
    }

    function displayNextWord() {
        if (currentIndex < uniqueWords.length) {
            const currentWord = uniqueWords[currentIndex];
            const card = createCard(currentWord);
            gameContainer.innerHTML = '';
            gameContainer.appendChild(card);
        }
    }

    function startTimer() {
        const timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Temps restant : ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        gameContainer.innerHTML = `<div class='text-center text-xl font-semibold'>Le jeu est terminé ! Votre score : ${score}</div>`;
    }
});
