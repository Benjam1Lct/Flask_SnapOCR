#!/usr/bin/env bash
# exit on error
set -o errexit

# Créer et activer l'environnement virtuel
python -m venv auth
. "$PWD/auth/Scripts/activate"

# Installer les dépendances dans l'environnement virtuel
pip install -r project/requirements.txt
