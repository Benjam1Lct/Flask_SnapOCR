import pipeline, tools
import os
import shutil
from flask import Flask, render_template, request, redirect, url_for
from flask_uploads import UploadSet, configure_uploads, IMAGES
import requests

keras_pipeline = pipeline.Pipeline()

application = Flask(__name__, template_folder='templates', static_folder='static')

application.config['UPLOADED_PHOTOS_DEST'] = 'uploads'
photos = UploadSet('photos', IMAGES)
configure_uploads(application, photos)

def upload_image_to_imgbb(image):
    url = 'https://api.imgbb.com/1/upload'
    payload = {
        'key': '63e476a7546c8f74439cde65f988f379',
        'image': image.read()
    }
    response = requests.post(url, payload)
    data = response.json()
    if data['status'] == 200:
        return data['data']['url']
    else:
        return None

@application.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and 'photo' in request.files:
        file = request.files['photo']
        if file:
            # Utilisez l'API d'ImgBB pour uploader l'image
            url = upload_image_to_imgbb(file)

        predictions = keras_pipeline.recognize([url])
        ocr_text = ""
        for text, box in predictions[0]:
            ocr_text += text + " "
        print(ocr_text)

        return render_template('render.html', ocr_text=ocr_text, name=url)
    return render_template('index.html')



@application.route('/renderTest')
def render():
    ocr_text = 'lorem ipsum dolor sit amet, consectetur adipiscing,lorem ipsum dolor sit amet, consecteturem ipsum dolor sit amet, consectetur adipiscing,lorem ipsum dolor sit amet, consecteturem ipsum dolor sit amet, consectetur adipiscing,lorem ipsum dolor sit amet, consecteturem ipsum dolor sit amet, consectetur adipiscing,lorem ipsum dolor sit amet, consecteturem ipsum dolor sit amet, consectetur adipiscing,lorem ipsum dolor sit amet, consecteturem ipsum dolor sit amet, consectetur adipiscing,lorem ipsum dolor sit amet, consectetur adipiscinglorem ipsum dolor sit amet, consectetur adiis '
    full_path = 'telechargement.png'
    return render_template('render.html', ocr_text=ocr_text, name=full_path)

@application.route('/connexion')
def connexion():
    
    return render_template('connexion.html')

@application.route('/inscription')
def inscription():
    return render_template('inscription.html')

@application.route('/mobile')
def mobile():
    return render_template('mobile.html')

@application.route('/blog')
def blog():
    return render_template('blog.html')

@application.route('/about_us')
def about_us():
    return render_template('about_us.html')

@application.route('/services')
def services():
    return render_template('services.html')


if __name__ == '__main__':
    application.run(host='0.0.0.0', port=80, debug=True)