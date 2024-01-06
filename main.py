from flask import Flask, jsonify, request, redirect, url_for, flash
import firebase_admin
from firebase_admin import credentials, auth, db

app = Flask(__name__)
app.secret_key = 'safety'

cred = credentials.Certificate("C://Users//KAIXI//PycharmProjects//Hackathon//beaver-believers-hackathonproj-firebase-adminsdk-od1x9-cca4980a45.json")
firebase_admin.initialize_app(cred)
database_url = 'https://your-firebase-project-id.firebaseio.com'


@app.route('/')
def login():
    return "Hello"

# USER DATA MUST BE USERNAME, PASSWORD, EMAIL
@app.route('/create_user', methods=['POST', 'GET'])
def add_user():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        try:
            auth.create_user(
                username=username,
                password=password,
                email=email
            )
            print("user created")
            return redirect(url_for('home'))

        except:
            flash("broken")


if __name__ == '__main__':
    app.run(debug=True)