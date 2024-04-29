document.addEventListener("DOMContentLoaded", function() {
    // Initialiser la page avec la première catégorie
    generatePhoneticBlocks(0);
    setInterval(changeCategoryAutomatically, 5000);  // Changer de catégorie automatiquement toutes les 5 secondes
    setInterval(animateLetters, 4000);  // Répéter l'animation toutes les 4 secondes
});

const phoneticLetters = [
    { category: "Lettres Labiales", letters: ["p", "b", "m", "ɱ", "ɸ", "β", "ɱ̥", "ɸ̥", "β̥"] },
    { category: "Lettres Dentales", letters: ["θ", "ð"] },
    { category: "Lettres Alvéolaires", letters: ["t", "d", "n", "s", "z", "l", "r"] },
    { category: "Lettres Palatales", letters: ["ç", "ʝ", "ɲ", "ʃ", "ʒ", "j"] },
    { category: "Lettres Vélaire", letters: ["k", "g", "ŋ", "x", "ɣ"] },
    { category: "Lettres Uvulaires", letters: ["q", "ɢ", "ɴ"] },
    { category: "Lettres Pharyngales", letters: ["ʡ", "ʢ"] },
    { category: "Lettres Glottales", letters: ["ʔ", "h"] },
    { category: "Lettres Fricatives", letters: ["f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "ç", "x", "ɣ", "ɸ", "β", "ʍ", "w", "ɹ", "ɻ", "j"] },
    { category: "Lettres Affriquées", letters: ["tʃ", "dʒ"] },
    { category: "Lettres Nasales", letters: ["m", "n", "ɲ", "ŋ", "ɴ"] },
    { category: "Lettres Liquides", letters: ["l", "ɾ", "r", "ɹ", "ɻ"] },
    { category: "Lettres Semi-voyelles", letters: ["j", "w"] },
    { category: "Lettres Occlusives", letters: ["p", "b", "t", "d", "k", "ɡ", "ʔ"] },
    { category: "Lettres Spirantes", letters: ["f", "v", "θ", "ð", "s", "z", "ʃ", "ʒ", "ç", "x", "ɣ", "ʍ", "w", "ɹ", "ɻ", "j"] },
    { category: "Lettres Constrictives", letters: ["h", "ɦ"] },
    { category: "Lettres Latérales", letters: ["l", "ɬ", "ɮ", "ʎ", "ʟ"] },
    { category: "Lettres Vibrantes", letters: ["r", "ʀ"] },
    { category: "Lettres Non-voisées", letters: ["p", "t", "k", "ʃ", "f", "θ", "s", "ç", "x", "ɸ", "ʍ", "h", "ʔ", "ɬ", "ɕ", "ʂ", "ɧ"] },
    { category: "Lettres Voisées", letters: ["b", "d", "ɡ", "ʒ", "v", "ð", "z", "ʝ", "ʁ", "m", "n", "ɲ", "ŋ", "ɴ", "ŋ̊", "ɦ", "ʕ", "ʁ̥", "ʜ", "ʢ", "ʡ"] },
    { category: "Lettres Vibrantes Simples", letters: ["ɾ", "r"] },
    { category: "Lettres Vibrantes Roulées", letters: ["ɹ", "ɻ", "ʀ"] },
    { category: "Lettres Vibrantes Battement de l'articulation Glottale", letters: ["ʙ"] },
    { category: "Lettres Vibrantes Battement de l'articulation UVulaire", letters: ["ʀ̥"] },
    { category: "Lettres Vibrantes Battement de l'articulation Vélaire", letters: ["ʀ̥ʷ"] },
    { category: "Lettres Vibrantes Battement de l'articulation Palatale", letters: ["ʀ̥ʲ"] },
    { category: "Lettres Vibrantes Battement de l'articulation Alvéolaire", letters: ["ʀ̥˔"] },
    { category: "Lettres Vibrantes Battement de l'articulation Bilabiale", letters: ["ʀ̥̆"] },
    { category: "Lettres Vibrantes Battement de l'articulation Pharyngale", letters: ["ʀ̥ˤ"] },
    { category: "Lettres Vibrantes Battement de l'articulation Laryngale", letters: ["ʀ̥ˁ"] }
    // Ajoutez d'autres catégories avec leurs lettres correspondantes ici
];


let animationPaused = false;
let currentCategoryIndex = 0;

// Sélection de la catégorie à partir du menu déroulant
const categorySelector = document.getElementById("categorySelector");
categorySelector.innerHTML = ""; // Effacer le contenu initial
phoneticLetters.forEach((category, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = category.category;
    categorySelector.appendChild(option);
});
categorySelector.addEventListener("change", function() {
    currentCategoryIndex = parseInt(categorySelector.value);
    generatePhoneticBlocks(currentCategoryIndex);
});

function generatePhoneticBlocks(categoryIndex) {
    const phoneticBlocksContainer = document.getElementById("phoneticBlocks");
    phoneticBlocksContainer.innerHTML = "";

    const category = phoneticLetters[categoryIndex];

    const categoryBlock = document.createElement("div");
    categoryBlock.classList.add("mb-4", "phonetic-category");

    const categoryTitle = document.createElement("h2");
    categoryTitle.classList.add("text-xl", "font-bold", "mb-2");
    categoryTitle.textContent = category.category;
    categoryBlock.appendChild(categoryTitle);

    const letterList = document.createElement("ul");
    letterList.classList.add("text-gray-700", "flex", "flex-wrap");

    category.letters.forEach(letter => {
        const listItem = document.createElement("li");
        listItem.textContent = letter;
        listItem.classList.add("phonetic-block", "m-2", "p-2", "rounded", "shadow-lg");
        letterList.appendChild(listItem);
    });

    categoryBlock.appendChild(letterList);
    phoneticBlocksContainer.appendChild(categoryBlock);
}

function animateLetters() {
    if (!animationPaused) {
        const blocks = document.querySelectorAll('.phonetic-block');
        blocks.forEach(block => {
            // Générer des valeurs aléatoires pour la translation en X et Y, et pour la rotation
            const newX = Math.random() * 100 - 50; // Déplacement aléatoire en X entre -50vw et 50vw
            const newY = Math.random() * 100 - 50; // Déplacement aléatoire en Y entre -50vh et 50vh
            const rotation = Math.random() * 360; // Rotation aléatoire entre 0 et 360 degrés
            block.style.transform = `translate(${newX}vw, ${newY}vh) rotate(${rotation}deg)`;
            block.style.transition = 'transform 3s ease-in-out';
        });
    }
}

function changeCategoryAutomatically() {
    if (!animationPaused) {
        currentCategoryIndex = (currentCategoryIndex + 1) % phoneticLetters.length;
        generatePhoneticBlocks(currentCategoryIndex);
    }
}

function toggleAnimation() {
    animationPaused = !animationPaused;
    const animationButton = document.getElementById("animationButton");
    animationButton.textContent = animationPaused ? "Reprendre l'animation" : "Mettre en pause";
}
