#!/usr/bin/env bash
# exit on error
set -o errexit

python -m venv auth
source auth/Scripts/activate

pip install -r project/requirements.txt

file_path="./auth/Lib/site-packages/flask_uploads.py"

# Effectuer le remplacement des lignes spécifiques
sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\nfrom werkzeug.datastructures import FileStorage/' $file_path

export FLASK_APP=project
export FLASK_DEBUG=1
export FLASK_RUN_HOST=0.0.0.0

flask run