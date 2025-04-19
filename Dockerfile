# Base image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install system packages
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the project files
COPY . .

# Patch flask-uploads to fix werkzeug import issue
RUN file_path=$(find /usr/local/lib -path "*/flask_uploads.py") && \
    sed -i 's/from werkzeug import secure_filename, FileStorage/from werkzeug.utils import secure_filename\nfrom werkzeug.datastructures import FileStorage/' "$file_path"


# Expose port
EXPOSE 5000

# Launch with gunicorn
CMD ["gunicorn", "run:app", "--bind", "0.0.0.0:5000"]
