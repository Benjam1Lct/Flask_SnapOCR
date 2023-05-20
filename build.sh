#!/usr/bin/env bash
# exit on error
set -o errexit

python -m venv auth
. "$PWD/auth/bin/activate"

pip install -r project/requirements.txt

# Recherche du fichier flask_uploads.py dans le répertoire d'installation de Flask
file_path=$(find "$PWD/auth" -type f -name "flask_uploads.py")

if [[ -n $file_path ]]; then
    # Effectuer le remplacement des lignes spécifiques
    sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\nfrom werkzeug.datastructures import FileStorage/' "$file_path"
else
    echo "Erreur : fichier flask_uploads.py introuvable."
    exit 1
fi