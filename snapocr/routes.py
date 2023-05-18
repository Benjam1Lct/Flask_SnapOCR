from snapocr import app, keras_pipeline
from flask import Flask, render_template, request, redirect, url_for, flash
import cloudinary
from cloudinary.uploader import upload, destroy
from snapocr.forms import RegistrationForm, LoginForm

def get_image_id_from_url(image_url):
    # Extraire le public_id de l'URL de l'image
    public_id = image_url.split('/')[-1].split('.')[0]
    return public_id

@app.route('/supprimer_image_cloudinary', methods=['POST'])
def supprimer_image_cloudinary():
    cloudinary.config(
    cloud_name = "dcjkfjdiv",
    api_key = "668559953486661",
    api_secret = "vVQ6CyNlSr8qCt54zMbstlLKZdY"
    )
    image_url = request.json['url']
    public_id = get_image_id_from_url(image_url)

    # Supprimer la ressource (image)
    response = destroy(public_id, resource_type = "image")

    if response['result'] == 'ok':
        print("L'image a été supprimée avec succès.")
    else:
        print("Une erreur s'est produite lors de la suppression de l'image.")

@app.route('/', methods=['GET' , 'POST'])
def index():
    if request.method == 'POST' and 'photo' in request.files:
        cloudinary.config(
        cloud_name = "dcjkfjdiv",
        api_key = "668559953486661",
        api_secret = "vVQ6CyNlSr8qCt54zMbstlLKZdY"
        )

        file = request.files['photo']
        
        upload_result = upload(file)
        image_url = upload_result['secure_url']
        print(image_url)
        
        predictions = keras_pipeline.recognize([image_url])
        ocr_text = ""
        for text, box in predictions[0]:
            ocr_text += text + " "
        print(ocr_text)
        print('Image processed successfully')
        return render_template('render.html', ocr_text=ocr_text, url=image_url)
    return render_template('index.html')

@app.route('/profil')
def profil():
    return render_template('profil.html')

@app.route('/renderTest')
def renderTest():
    ocr_text = 'text'
    full_path = 'telechargement.png'
    return render_template('render.html', ocr_text=ocr_text, name=full_path)

@app.route('/inscription', methods=['GET', 'POST'])
def inscription():
    form=RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created successfully for {form.username.data}', category='success')
        return redirect(url_for('connexion'))
    return render_template('inscription.html', form=form)

@app.route('/connexion', methods=['GET', 'POST'])
def connexion():
    form=LoginForm()
    if form.validate_on_submit():
        if form.email.data=='benjamin.l06@outlook.fr' and form.password.data=='123456':
            flash(f'Login successful for {form.email.data}', category='success')
            return redirect(url_for('profil'))
        else:
            flash(f'Login unsuccessful for {form.email.data}', category='danger')
    return render_template('connexion.html', form=form)

@app.route('/mobile')
def mobile():
    return render_template('mobile.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.route('/services')
def services():
    return render_template('services.html')