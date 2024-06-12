### README complet avec instructions de dépannage et ajout manuel du chemin de FFmpeg

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

#### Utilisation de PowerShell
1. Créez un fichier nommé `install_ffmpeg.ps1` à la racine de votre projet Django avec le contenu suivant :
    ```powershell
    # Téléchargement de l'archive ffmpeg
    Invoke-WebRequest -Uri https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip -OutFile ffmpeg-release-essentials.zip

    # Création du dossier ffmpeg et extraction de l'archive
    New-Item -ItemType Directory -Path C:\ffmpeg -Force
    Expand-Archive -Path .\ffmpeg-release-essentials.zip -DestinationPath C:\ffmpeg -Force

    # Suppression de l'archive téléchargée
    Remove-Item -Path .\ffmpeg-release-essentials.zip

    # Ajout de ffmpeg au PATH
    $ffmpegPath = Get-ChildItem -Path C:\ffmpeg -Directory | Select-Object -First 1 | ForEach-Object { $_.FullName }
    $binPath = "$ffmpegPath\bin"
    $oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
    $newPath = "$oldPath;$binPath"
    [Environment]::SetEnvironmentVariable('Path', $newPath, [EnvironmentVariableTarget]::Machine)

    # Affichage du message de succès
    Write-Host "Installation de ffmpeg terminée. Veuillez redémarrer PowerShell et vérifier avec 'ffmpeg -version'."
    ```

2. Exécutez le script PowerShell en tant qu'administrateur pour installer FFmpeg et ajouter le chemin au PATH :
    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    .\install_ffmpeg.ps1
    ```

3. Redémarrez PowerShell et vérifiez l'installation :
    ```powershell
    ffmpeg -version
    ```

#### Ajout manuel du chemin dans les variables d'environnement
1. **Ouvrez le panneau de configuration** :
    - Cliquez sur le menu Démarrer, tapez "Panneau de configuration" et ouvrez-le.
2. **Accédez aux paramètres système avancés** :
    - Cliquez sur "Système et sécurité" puis sur "Système".
    - Cliquez sur "Paramètres système avancés" dans le menu de gauche.
3. **Variables d'environnement** :
    - Cliquez sur le bouton "Variables d'environnement" en bas de la fenêtre.
4. **Modifier la variable Path** :
    - Dans la section "Variables système", trouvez et sélectionnez la variable Path, puis cliquez sur "Modifier".
    - Cliquez sur "Nouveau" et ajoutez le chemin complet vers le dossier `bin` de FFmpeg, par exemple : `C:\ffmpeg\ffmpeg-<version>-essentials_build\bin`.
    - Cliquez sur "OK" pour fermer toutes les fenêtres.

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
- **FFmpeg non trouvé** : Assurez-vous que le chemin vers le dossier `bin` de FFmpeg est correctement ajouté à la variable d'environnement `Path`. Suivez les étapes de la section "Installer FFmpeg" pour vérifier et ajouter le chemin si nécessaire.
- **Erreur de conversion avec FFmpeg** : Assurez-vous que FFmpeg est installé correctement et que le chemin est ajouté à la variable d'environnement `Path`. Vérifiez également que votre fichier audio est accessible et non corrompu.

## Scripts Utiles

### Script d'installation de FFmpeg (Windows)

Un script PowerShell (`install_ffmpeg.ps1`) est fourni à la racine du projet pour faciliter l'installation de FFmpeg. Voici comment l'utiliser :

1. **Créer le script** : Créez un fichier nommé `install_ffmpeg.ps1` à la racine du projet et collez-y le contenu suivant :

    ```powershell
    # Téléchargement de l'archive ffmpeg
    Invoke-WebRequest -Uri https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip -OutFile ffmpeg-release-essentials.zip

    # Création du dossier ffmpeg et extraction de l'archive
    New-Item -ItemType Directory -Path C:\ffmpeg -Force
    Expand-Archive -Path .\ffmpeg-release-essentials.zip -DestinationPath C:\ffmpeg -Force

    # Suppression de l'archive téléchargée
    Remove-Item -Path .\ffmpeg-release-essentials.zip

    # Ajout de ffmpeg au PATH
    $ffmpegPath = Get-ChildItem -Path C:\ffmpeg -Directory | Select-Object -First 1 | ForEach-Object { $_.FullName }
    $binPath = "$ffmpegPath\bin"
    $oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariable

Target]::Machine)
    $newPath = "$oldPath;$binPath"
    [Environment]::SetEnvironmentVariable('Path', $newPath, [EnvironmentVariableTarget]::Machine)

    # Affichage du message de succès
    Write-Host "Installation de ffmpeg terminée. Veuillez redémarrer PowerShell et vérifier avec 'ffmpeg -version'."
    ```

2. Exécutez le script PowerShell en tant qu'administrateur pour installer FFmpeg et ajouter le chemin au PATH :
    ```powershell
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    .\install_ffmpeg.ps1
    ```

3. Redémarrez PowerShell et vérifiez l'installation :
    ```powershell
    ffmpeg -version
    ```

#### Ajout manuel du chemin dans les variables d'environnement
1. **Ouvrez le panneau de configuration** :
    - Cliquez sur le menu Démarrer, tapez "Panneau de configuration" et ouvrez-le.
2. **Accédez aux paramètres système avancés** :
    - Cliquez sur "Système et sécurité" puis sur "Système".
    - Cliquez sur "Paramètres système avancés" dans le menu de gauche.
3. **Variables d'environnement** :
    - Cliquez sur le bouton "Variables d'environnement" en bas de la fenêtre.
4. **Modifier la variable Path** :
    - Dans la section "Variables système", trouvez et sélectionnez la variable Path, puis cliquez sur "Modifier".
    - Cliquez sur "Nouveau" et ajoutez le chemin complet vers le dossier `bin` de FFmpeg, par exemple : `C:\ffmpeg\ffmpeg-<version>-essentials_build\bin`.
    - Cliquez sur "OK" pour fermer toutes les fenêtres.
```