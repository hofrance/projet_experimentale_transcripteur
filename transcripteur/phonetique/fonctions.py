import re

def post_traitement_phonetique_avance(phonetique):
    """
    Applique un post-traitement avancé à une transcription phonétique pour affiner
    sa conformité aux spécificités de prononciation du français. Cette version enrichie
    inclut des corrections supplémentaires pour traiter des cas spécifiques de la langue.
    """
    corrections = [
        # Correction des liaisons et enchaînements
        (r'(?<=[z s x t n]) (?=[aeiouɛɔɑœ])', '‿'),
        (r'e‿(s|z|ʃ)', r'‿\1'),

        # Harmonisation des "e" muets
        (r'\bə\b', ''),
        (r'ə(?= [ʃʒ])', ''),

        # Adaptation des terminaisons verbales et des nasales
        (r'əʁ\b', 'e'),
        (r'ɛ̃(?! [nmg])', 'ɛ̃'),

        # Corrections spécifiques et fines
        (r'ɑ̃‿', 'ɑ̃'),
        (r'œ̃‿', 'œ̃'),
        (r'ɛ̃‿', 'ɛ̃'),

        # Gestion des h aspirés et muets
        (r'(?<= )h', ''),

        # Raffinement de la lisibilité et de la clarté
        (r'‿', ' '),

        # Corrections supplémentaires pour la prononciation française
        (r'tʃ', 'ʧ'),
        (r'dʒ', 'ʤ'),
        (r'p(?=t\b)', ''),
        (r's\b', ''),
        (r'ɔ$', 'o'),
        (r'œ$', 'ø'),
        (r'(?<= )y', 'j'),
        (r'y(?= [aeiouɛɔɑœ])', 'j'),

        # Mettre en évidence les syllabes pour une meilleure lisibilité
        (r' - ', r' · '),

        # Nouvelles corrections pour une prononciation plus précise
        (r'n(?=k\b)', ''),  # "n" muet avant "k" en fin de mot
        (r'ɡ(?=n)', 'ɲ'),  # Transformation de "gn" en "ɲ"
        (r'(?<=m)ɛ', 'ɛ̃'),  # Nasalisation de "ɛ" après "m"
        (r'ʁʁ', 'ʁ'),  # Simplification des "rr" doubles
        (r'ʃʃ', 'ʃ'),  # Simplification des "ch" doubles
        (r'(?<!ɛ)ʒ(?=ɛ)', 'ʃ'),  # Transformation de "ʒ" en "ʃ" devant "ɛ" si pas précédé par "ɛ"
        (r'ɛʒ', 'ɛʃ'),  # Transformation de "ɛʒ" en "ɛʃ"
        (r'ɑɔ', 'o'),  # Simplification de la séquence "ɑɔ" en "o"
        (r'ɔi', 'wa'),  # Transformation de "ɔi" en "wa"
        (r'ui', 'wi'),  # Transformation de "ui" en "wi"
        (r'oi', 'wa'),  # Transformation de "oi" en "wa"
        (r'ɛu', 'ø'),  # Transformation de "ɛu" en "ø"
        (r'ɛɛ', 'ɛː'),  # Allongement de "ɛɛ" en "ɛː"
        (r'ii', 'iː'),  # Allongement de "ii" en "iː"
    ]

    # Appliquer les corrections
    for pattern, replacement in corrections:
        phonetique = re.sub(pattern, replacement, phonetique)

    # Nettoyage final des espaces excédentaires
    phonetique = re.sub(r'\s+', ' ', phonetique).strip()

    return phonetique

def formater_phonetique(phonetique):
    """
    Améliore le formatage de la transcription phonétique, en ajoutant des marqueurs pour
    l'intonation, la longueur des sons, et les pauses, rendant la lecture plus intuitive.
    """
    phonetique = phonetique.replace('  ', ' / ')  # Marque les pauses entre mots
    phonetique = phonetique.replace(' - ', ' • ')  # Marque les divisions syllabiques
    phonetique = marque_sons_longs(phonetique)
    phonetique = integrer_intonation(phonetique)

    return phonetique

def marque_sons_longs(phonetique):
    """
    Marque les sons longs avec le symbole "ː" pour une meilleure distinction de la longueur des sons.
    """
    phonetique = re.sub(r'\b(.)\1+', r'\1ː', phonetique)
    return phonetique

def integrer_intonation(phonetique):
    """
    Intègre des indications d'intonation à la transcription phonétique pour refléter les variations
    de ton caractéristiques des questions, exclamations, et affirmations.
    """
    phonetique = phonetique.replace('?', ' ˈ↑').replace('!', ' ˈ↓')
    phonetique = re.sub(r'\.([^ ])', r'ˈ\. \1', phonetique)  # Marque une pause à la fin des phrases
    phonetique = phonetique.replace('ˈ↑', '↑').replace('ˈ↓', '↓')  # Simplification des marqueurs

    return phonetique
