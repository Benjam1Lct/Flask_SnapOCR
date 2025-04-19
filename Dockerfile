# Utilise une image légère Python
FROM python:3.10-slim

# Définit le dossier de travail
WORKDIR /app

# Copie les fichiers nécessaires
COPY . .

# Installe les dépendances
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# ✅ Patch du bug Flask-Uploads → werkzeug
RUN sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\\nfrom werkzeug.datastructures import FileStorage/' /usr/local/lib/python3.10/site-packages/flask_uploads.py

# Expose le port
EXPOSE 5000

# Démarre l'application Flask
CMD ["python", "run.py"]
