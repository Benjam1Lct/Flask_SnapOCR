#!/usr/bin/env bash
# exit on error
set -o errexit

python -m venv auth
. "$PWD/auth/bin/activate"

pip install -r project/requirements.txt

# Rechercher le fichier flask_uploads.py et récupérer son chemin
file_path=$(find "$PWD/auth/Lib/site-packages" -name "flask_uploads.py")

# Vérifier si le fichier a été trouvé
if [[ -n $file_path ]]; then
  # Effectuer le remplacement des lignes spécifiques
  sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\nfrom werkzeug.datastructures import FileStorage/' "$file_path"
else
  echo "Le fichier flask_uploads.py n'a pas été trouvé."
  exit 1
fi