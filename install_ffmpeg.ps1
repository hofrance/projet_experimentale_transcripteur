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
