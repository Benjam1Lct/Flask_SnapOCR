#!/usr/bin/env bash
# exit on error
set -o errexit

python -m venv auth
. "$PWD/auth/bin/activate"

pip install -r project/requirements.txt

file_path="/opt/render/project/src/auth/lib/python3.7/site-packages/flask_uploads.py"

# Effectuer le remplacement des lignes spécifiques
sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\nfrom werkzeug.datastructures import FileStorage/' $file_path
