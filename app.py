from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html',  page='index')

@app.route('/agenda')
def index1():
    return render_template('agenda.html',  page='index' )