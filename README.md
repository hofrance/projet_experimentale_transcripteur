Voici le README complet pour une installation sereine du projet expérimental de transcription :

```markdown
# Projet Expérimental Transcripteur

## Introduction
Ce projet est un outil expérimental de transcription destiné à convertir des fichiers audio ou du texte en texte phonétique. Ce guide vous aidera à configurer et exécuter le serveur de transcription.

## Prérequis
- Python 3.7 ou supérieur
- Environnement virtuel (venv)
- Git
- FFmpeg

## Installation

### 1. Installer Python

#### Windows
1. Téléchargez l'installeur Python depuis [python.org](https://www.python.org/downloads/).
2. Exécutez l'installeur et assurez-vous de cocher l'option "Ajouter Python à PATH".
3. Suivez les instructions de l'installeur.

#### macOS
1. Ouvrez le Terminal.
2. Installez Homebrew si ce n'est pas déjà fait :
    ```bash
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
3. Installez Python :
    ```bash
    brew install python
    ```

#### Linux
Utilisez le gestionnaire de paquets de votre distribution. Par exemple, sur Ubuntu :
```bash
sudo apt update
sudo apt install python3 python3-venv python3-pip
```

### 2. Installer Git
#### Windows
Téléchargez et installez Git depuis [git-scm.com](https://git-scm.com/download/win).

#### macOS
Git est souvent déjà installé. Sinon, utilisez Homebrew :
```bash
brew install git
```

#### Linux
Utilisez le gestionnaire de paquets de votre distribution. Par exemple, sur Ubuntu :
```bash
sudo apt install git
```

### 3. Installer FFmpeg

#### Utilisation de Winget
1. Ouvrez PowerShell ou le Terminal en tant que admin.
2. Exécutez la commande suivante :
    ```powershell
    winget install ffmpeg
    ```
3. Ajoutez le répertoire `bin` de FFmpeg au Path de Windows :
    ```plaintext
    C:\Users\<votre_nom_utilisateur>\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-6.0-full_build\bin
    ```
    Remplacez `<votre_nom_utilisateur>` par votre nom d'utilisateur réel.
4. Vérifiez l'installation :
    ```powershell
    ffmpeg -version
    ```

### 4. Cloner le dépôt
Pour cloner le dépôt, exécutez la commande suivante :
```bash
git clone https://github.com/hofrance/projet_experimentale_transcripteur.git
cd projet_experimentale_transcripteur
```

### 5. Créer un environnement virtuel
Créez un environnement virtuel pour isoler les dépendances du projet :
```bash
python -m venv myenv
```

### 6. Activer l'environnement virtuel
Activez l'environnement virtuel avec les commandes appropriées pour votre système d'exploitation :

- Sur Windows :
    ```bash
    .\myenv\Scripts\activate
    ```

- Sur macOS/Linux :
    ```bash
    source myenv/bin/activate
    ```

### 7. Installer les dépendances
Installez les dépendances nécessaires en utilisant le fichier `requirements.txt` :
```bash
pip install -r requirements.txt
```

### 8. Installer Django
Assurez-vous d'avoir Django installé :
```bash
pip install django
```

### 9. Configurer le Projet

#### Variables d'Environnement
Configurez les variables d'environnement nécessaires. Créez un fichier `.env` à la racine du projet et ajoutez les variables requises, telles que les clés API et les configurations de la base de données.



## Lancer le Serveur

### 1. Naviguer dans le Répertoire du Transcripteur
Allez dans le répertoire principal du transcripteur :
```bash
cd transcripteur
```

### 2. Exécuter le Serveur
Démarrez le serveur de développement :
```bash
python manage.py runserver
```

### 3. Accéder au Serveur
Ouvrez votre navigateur web et allez à `http://127.0.0.1:8000/`.

## Utilisation

### Transcription de Texte
1. Accédez à l'interface utilisateur via l'adresse du serveur.
2. Entrez le texte que vous souhaitez transcrire dans la zone prévue.
3. Cliquez sur "Transcrire" pour obtenir le texte phonétique.

### Transcription Audio
1. Téléchargez le fichier audio à transcrire.
2. Le serveur analysera l'audio et produira un texte phonétique.

## Structure du Projet

- `myenv/` : Environnement virtuel Python.
- `transcripteur/` : Répertoire principal du transcripteur contenant le code source.
- `requirements.txt` : Fichier listant les dépendances Python nécessaires.
- `manage.py` : Script de gestion de Django.

## Dépannage

### Problèmes Courants
- **Problèmes de Dépendances** : Assurez-vous d'avoir correctement installé toutes les dépendances avec `pip install -r requirements.txt`.
- **Problèmes de Serveur** : Vérifiez que le port 8000 est libre et que le serveur est démarré correctement.
