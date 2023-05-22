#!/usr/bin/env bash
# exit on error
set -o errexit

python -m venv auth
. "$PWD/auth/Lib/activate"

pip install -r project/requirements.txt
