import pyrebase

config = {
    'apiKey': "AIzaSyAXeFULPPWWvvkyKoYHmcKKKFDk_0VUVMU",
    'authDomain': "flask-ocr-d3202.firebaseapp.com",
    'projectId': "flask-ocr-d3202",
    'storageBucket': "flask-ocr-d3202.appspot.com",
    'messagingSenderId': "8263234287",
    'appId': "1:8263234287:web:b4d9439330210f31bce11a",
    'measurementId': "G-LQVJKMKES4",
    'databaseURL' : ''
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

email = 'test@gmail.com'
password = '123456'

user = auth.create-user_with_email(email, password)
print(user)