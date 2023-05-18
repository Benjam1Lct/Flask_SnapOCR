from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, configure_uploads, IMAGES
from . import (
    detection,
    recognition,
    tools,
    data_generation,
    pipeline,
    evaluation,
    datasets,
    config,
)

app = Flask(__name__, template_folder='templates', static_folder='static')

app.config['SECRET_KEY'] = 'thisisasecretkeyformyappflask'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/flaskocr.db'

db = SQLAlchemy(app)

app.config['UPLOADED_PHOTOS_DEST'] = 'uploads'
photos = UploadSet('photos', IMAGES)
configure_uploads(app, photos)

from snapocr import pipeline
keras_pipeline = pipeline.Pipeline()

from snapocr import routes



