from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html',  page='index')

@app.route('/1')
def index1():
    return render_template('index1.html',  page='index1' )