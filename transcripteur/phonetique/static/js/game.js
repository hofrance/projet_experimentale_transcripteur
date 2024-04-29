document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.getElementById('game-container');
    let score = 0;
    let currentIndex = 0;
    const uniqueWords = getUniqueWords();

    displayNextWord();

    function getUniqueWords() {
        const words = [
            { word: "arbre", options: ["/aʁbʁ/", "/ɑʁb/", "/ɑʁbʁə/", "/aʁ.bʁə/"], answerIndex: 0 },
            { word: "chat", options: ["/ʃa/", "/ʃɑ/", "/ʃat/", "/ʃɑt/"], answerIndex: 2 },
            { word: "soleil", options: ["/sɔ.lɛj/", "/sɔ.lɛjə/", "/sɔ.lɛj.lə/", "/sɔ.lɛj.jə/"], answerIndex: 1 },
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
        card.className = 'bg-white shadow rounded p-4 m-2';
        const wordTitle = document.createElement('h3');
        wordTitle.className = 'text-lg font-bold';
        wordTitle.textContent = word.word;
        card.appendChild(wordTitle);

        word.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded m-1';
            button.textContent = option;
            button.onclick = () => handleOptionClick(index, word.answerIndex, card);
            card.appendChild(button);
        });

        return card;
    }

    function handleOptionClick(selectedIndex, correctIndex, card) {
        const allButtons = card.querySelectorAll('button');
        allButtons.forEach(button => button.disabled = true);

        if (selectedIndex === correctIndex) {
            card.style.backgroundColor = "#D1E7DD"; // Green
            score++;
        } else {
            card.style.backgroundColor = "#F8D7DA"; // Red
        }

        setTimeout(() => {
            currentIndex++;
            if (currentIndex < uniqueWords.length) {
                displayNextWord();
            } else {
                gameContainer.innerHTML = `<div class='text-center text-xl font-semibold'>Le jeu est terminé ! Votre score : ${score}</div>`;
            }
        }, 1500);
    }

    function displayNextWord() {
        if (currentIndex < uniqueWords.length) {
            const currentWord = uniqueWords[currentIndex];
            const card = createCard(currentWord);
            gameContainer.innerHTML = '';
            gameContainer.appendChild(card);
        }
    }
});
