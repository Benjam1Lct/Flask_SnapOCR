import pipeline
from flask import Flask, render_template, request, url_for
from flask_uploads import UploadSet, configure_uploads, IMAGES
import cloudinary
from cloudinary.uploader import upload, destroy

cloudinary.config(
  cloud_name = "dcjkfjdiv",
  api_key = "668559953486661",
  api_secret = "vVQ6CyNlSr8qCt54zMbstlLKZdY"
)

application = Flask(__name__, template_folder='templates', static_folder='static')

application.config['UPLOADED_PHOTOS_DEST'] = 'uploads'
photos = UploadSet('photos', IMAGES)
configure_uploads(application, photos)

keras_pipeline = pipeline.Pipeline()


def get_image_id_from_url(image_url):
    # Extraire le public_id de l'URL de l'image
    public_id = image_url.split('/')[-1].split('.')[0]
    return public_id

@application.route('/supprimer_image_cloudinary', methods=['POST'])
def supprimer_image_cloudinary():
    image_url = request.json['url']
    public_id = get_image_id_from_url(image_url)

    # Supprimer la ressource (image)    
    response = destroy(public_id, resource_type = "image")

    if response['result'] == 'ok':
        print("L'image a été supprimée avec succès.")
    else:
        print("Une erreur s'est produite lors de la suppression de l'image.")

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

@application.route('/profil')
def profil():
    return render_template('profil.html')

@application.route('/renderTest')
def renderTest():
    ocr_text = 'text'
    full_path = 'telechargement.png'
    return render_template('render.html', ocr_text=ocr_text, name=full_path)

@application.route('/connexion')
def connexion():
    return render_template('connexion.html', form=form)

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