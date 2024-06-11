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
    {
        word: "chien",
        options: ["/ʃjɛ̃/", "/ʃiɛn/", "/ʃɛn/", "/ʃɑn/"],
        answerIndex: 0,
        explanation: "Le mot 'chien' contient le son chuintant /ʃ/ et le son nasal /jɛ̃/. En API: /ʃjɛ̃/."
    },
    {
        word: "maison",
        options: ["/mɛ.zɔ̃/", "/mɛ.zɔn/", "/mɛ.zon/", "/mɛz.jɔ̃/"],
        answerIndex: 0,
        explanation: "Le mot 'maison' contient les sons /mɛ/ et /zɔ̃/, un mélange de consonnes et de voyelles nasales. En API: /mɛ.zɔ̃/."
    },
    {
        word: "eau",
        options: ["/o/", "/ɔ/", "/ou/", "/eau/"],
        answerIndex: 0,
        explanation: "Le mot 'eau' est représenté par le son simple /o/. En API: /o/."
    },
    {
        word: "feu",
        options: ["/fø/", "/fœ/", "/fɥ/", "/fe/"],
        answerIndex: 0,
        explanation: "Le mot 'feu' est représenté par le son arrondi /fø/. En API: /fø/."
    },
    {
        word: "lune",
        options: ["/lyn/", "/lɥn/", "/lun/", "/lɔn/"],
        answerIndex: 0,
        explanation: "Le mot 'lune' contient les sons /l/ et /yn/. En API: /lyn/."
    },
    {
        word: "table",
        options: ["/tabl/", "/tablə/", "/tablə/", "/tab.lə/"],
        answerIndex: 2,
        explanation: "Le mot 'table' contient les sons /t/ et /bl/. En API: /tabl/."
    },
    {
        word: "roi",
        options: ["/ʁwa/", "/ʁoa/", "/ʁwaɪ/", "/ʁoɪ/"],
        answerIndex: 0,
        explanation: "Le mot 'roi' contient les sons /ʁ/ et /wa/. En API: /ʁwa/."
    },
    {
        word: "pied",
        options: ["/pje/", "/piɛ/", "/pɪe/", "/pie/"],
        answerIndex: 0,
        explanation: "Le mot 'pied' est représenté par le son /pje/. En API: /pje/."
    },
    {
        word: "fleur",
        options: ["/flœʁ/", "/flœr/", "/flɛʁ/", "/fləʁ/"],
        answerIndex: 0,
        explanation: "Le mot 'fleur' contient les sons /fl/ et /œʁ/. En API: /flœʁ/."
    },
    {
        word: "livre",
        options: ["/livʁ/", "/livəʁ/", "/livrə/", "/liv.rə/"],
        answerIndex: 0,
        explanation: "Le mot 'livre' contient les sons /l/ et /ivʁ/. En API: /livʁ/."
    },
    {
        word: "voiture",
        options: ["/vwa.tyʁ/", "/voat.yʁ/", "/vwat.yʁ/", "/voa.tyʁ/"],
        answerIndex: 0,
        explanation: "Le mot 'voiture' contient les sons /v/ et /wa.tyʁ/. En API: /vwa.tyʁ/."
    },
    {
        word: "oiseau",
        options: ["/wazo/", "/wazɔ/", "/wazou/", "/waso/"],
        answerIndex: 0,
        explanation: "Le mot 'oiseau' contient les sons /w/ et /azo/. En API: /wazo/."
    },
    {
        word: "ami",
        options: ["/ami/", "/ɑmi/", "/amiʃ/", "/amɪ/"],
        answerIndex: 0,
        explanation: "Le mot 'ami' contient les sons /a/ et /mi/. En API: /ami/."
    },
    {
        word: "soleil",
        options: ["/sɔ.lɛj/", "/sɔ.lɛjə/", "/sɔ.lɛj.lə/", "/sɔ.lɛj.jə/"],
        answerIndex: 1,
        explanation: "Le mot 'soleil' contient les sons /sɔ/ et /lɛj/. En API: /sɔ.lɛjə/."
    },
    {
        word: "porte",
        options: ["/pɔʁt/", "/pɔrtə/", "/pɔʁtə/", "/pɔʁt.lə/"],
        answerIndex: 0,
        explanation: "Le mot 'porte' contient les sons /p/ et /ɔʁt/. En API: /pɔʁt/."
    },
    {
        word: "école",
        options: ["/e.kɔl/", "/e.kɔlə/", "/e.kɔ.lə/", "/e.kɔl.ə/"],
        answerIndex: 0,
        explanation: "Le mot 'école' contient les sons /e/ et /kɔl/. En API: /e.kɔl/."
    },
    {
        word: "étoile",
        options: ["/e.twal/", "/e.twa.lə/", "/e.twalə/", "/e.twa.lə/"],
        answerIndex: 0,
        explanation: "Le mot 'étoile' contient les sons /e/ et /twal/. En API: /e.twal/."
    }
    // Ajoutez d'autres mots avec leurs options et explications ici...
];

function getUniqueWords() {
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
