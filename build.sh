#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

file_path="/opt/render/project/src/.venv/lib/python3.7/site-packages/flask_uploads.py"

# Effectuer le remplacement des lignes spécifiques
sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\nfrom werkzeug.datastructures import FileStorage/' $file_path