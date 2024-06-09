# README pour Projet Expérimental Transcripteur

## Introduction
Ce projet est un outil expérimental de transcription destiné à convertir  audio ou du texte en texte phonétique. Ce guide vous aidera à configurer et exécuter le serveur de transcription.

## Prérequis
- Python 3.7 ou supérieur
- Environnement virtuel (venv)
- Git

## Installation

### 1. Cloner le dépôt
Pour cloner le dépôt, exécutez la commande suivante :
```bash
git clone https://github.com/hofrance/projet_experimentale_transcripteur.git
cd projet_experimentale_transcripteur
```

### 2. Créer un environnement virtuel
Créez un environnement virtuel pour isoler les dépendances du projet :
```bash
python -m venv myenv
```

### 3. Activer l'environnement virtuel
Activez l'environnement virtuel avec les commandes appropriées pour votre système d'exploitation :

- Sur Windows :
    ```bash
    .\myenv\Scripts\activate
    ```

- Sur macOS/Linux :
    ```bash
    source myenv/bin/activate
    ```

### 4. Installer les dépendances
Installez les dépendances nécessaires en utilisant le fichier `requirements.txt` :
```bash
pip install -r requirements.txt
```

### 5. Configurer le Projet

#### Variables d'Environnement
Configurez les variables d'environnement nécessaires. Créez un fichier `.env` à la racine du projet et ajoutez les variables requises, telles que les clés API et les configurations de la base de données.

#### Exemple de fichier `.env`
```
SECRET_KEY=votre_clé_secrète
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

### 6. Initialiser la Base de Données

Exécutez les migrations de base de données pour configurer la base de données :
```bash
python manage.py migrate
```

### 7. Créer un Super Utilisateur

Pour accéder à l'interface d'administration, créez un super utilisateur :
```bash
python manage.py createsuperuser
```

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

### Logs et Debugging
Pour obtenir plus d'informations sur les erreurs, consultez les logs du serveur et utilisez les outils de debugging intégrés de Django.

## Contributions
Les contributions sont les bienvenues. Veuillez suivre ces étapes pour contribuer :
1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Commitez vos modifications (`git commit -m 'Ajouter ma fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

## Contact

Pour toute question ou support, veuillez contacter le mainteneur du projet via le tracker d'issues du dépôt GitHub.
