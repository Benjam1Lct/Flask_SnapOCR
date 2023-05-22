#!/usr/bin/env bash
# exit on error
set -o errexit

# Créer et activer l'environnement virtuel
python -m venv auth
. "$PWD/auth/Scripts/activate"

# Installer les dépendances dans l'environnement virtuel
pip install -r project/requirements.txt

# Chemin vers le fichier flask_uploads.py
file_path="./Flask_SnapOCR-2auth/Lib/site-packages/flask_uploads.py"

# Effectuer le remplacement des lignes spécifiques
sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\nfrom werkzeug.datastructures import FileStorage/' $file_path
