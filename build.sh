#!/usr/bin/env bash
# exit on error
set -o errexit

python -m pip install virtualenv
python -m virtualenv auth
. auth/bin/activate

pip install -r project/requirements.txt
