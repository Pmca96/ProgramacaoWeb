from flask import Flask, render_template, redirect

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('login.html', page='login')


@app.route('/logout')
def logout():
    return redirect("/")


@app.route('/recuperar')
def recuperar():
    return render_template('recuperar.html', page='recuperar')


@app.route('/registar')
def registar():
    return render_template('registar.html', page='registar')


@app.route('/agenda')
def agenda():
    return render_template('agenda.html', page='agenda')


@app.route('/contactos')
def contactos():
    return render_template('contactos.html', page='contactos')


@app.route('/tarefas')
def tarefas():
    return render_template('tarefas.html', page='tarefas')
