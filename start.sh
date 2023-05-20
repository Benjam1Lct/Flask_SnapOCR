#!/usr/bin/env bash
# exit on error
set -o errexit

source ./auth/Scripts/activate

export FLASK_APP=project
export FLASK_DEBUG=1
export FLASK_RUN_HOST=0.0.0.0

flask run
