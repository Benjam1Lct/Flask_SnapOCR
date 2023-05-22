#!/usr/bin/env bash
# exit on error
set -o errexit

python -m venv auth
"/auth/Scripts/activate"

pip install -r project/requirements.txt
