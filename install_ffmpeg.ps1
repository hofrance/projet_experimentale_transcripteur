$DestinationPath = "C:\Users\rbankouezi\Documents\projet_experimentale_transcripteur\ffmpeg_installation"

# Créer le répertoire d'installation si nécessaire
if (-Not (Test-Path -Path $DestinationPath)) {
    New-Item -ItemType Directory -Force -Path $DestinationPath
}

# Télécharger et extraire FFmpeg
Invoke-WebRequest -Uri "https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip" -OutFile "$DestinationPath\ffmpeg.zip"
Expand-Archive -Path "$DestinationPath\ffmpeg.zip" -DestinationPath $DestinationPath

# Déplacer les fichiers FFmpeg
$ffmpegDir = Get-ChildItem -Directory -Path $DestinationPath | Where-Object { $_.Name -like "ffmpeg*" }
Move-Item -Path "$ffmpegDir\*" -Destination $DestinationPath -Force

# Supprimer les fichiers téléchargés
Remove-Item -Path "$DestinationPath\ffmpeg.zip"
Remove-Item -Path $ffmpegDir -Recurse

# Ajouter FFmpeg au PATH pour la session actuelle
$env:Path += ";$DestinationPath\bin"

# Vérifier l'installation de FFmpeg
ffmpeg -version
