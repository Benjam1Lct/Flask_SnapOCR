import pipeline, tools
from flask import Flask, render_template, request, redirect, url_for
from flask_uploads import UploadSet, configure_uploads, IMAGES
import cloudinary
from cloudinary.uploader import upload

cloudinary.config(
  cloud_name = "dcjkfjdiv",
  api_key = "668559953486661",
  api_secret = "vVQ6CyNlSr8qCt54zMbstlLKZdY"
)

keras_pipeline = pipeline.Pipeline()

application = Flask(__name__, template_folder='templates', static_folder='static')

application.config['UPLOADED_PHOTOS_DEST'] = 'uploads'
photos = UploadSet('photos', IMAGES)
configure_uploads(application, photos)


@application.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST' and 'photo' in request.files:
        file = request.files['photo']
        upload_result = upload(file)
        image_url = upload_result['secure_url']
        print(image_url)
        
        predictions = keras_pipeline.recognize([image_url])
        ocr_text = ""
        for text, box in predictions[0]:
            ocr_text += text + " "
        print(ocr_text)

        return render_template('render.html', ocr_text=ocr_text, url=image_url)
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