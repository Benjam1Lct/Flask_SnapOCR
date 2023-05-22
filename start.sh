#!/usr/bin/env bash
# exit on error
set -o errexit

. auth/bin/activate

gunicorn app:project
