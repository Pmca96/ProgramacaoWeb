from flask import Flask, render_template, redirect, request

app = Flask(__name__)


@app.route('/')
def index():
    data = {"page": "login"}
    return render_template('login.html', data=data)


@app.route('/logout')
def logout():
    return redirect("/")


@app.route('/recuperar')
def recuperar():
    data = {"page": "recuperar"}
    return render_template('recuperar.html', data=data)


@app.route('/registar')
def registar():
    data = {"page": "registar"}
    return render_template('registar.html', data=data)


@app.route('/agenda')
def agenda():
    data = {"page": "agenda"}
    return render_template('agenda.html', data=data)


@app.route('/contactos')
def contactos():
    data = {"page": "contactos"}
    return render_template('contactos.html', data=data)


@app.route('/tarefas')
def tarefas():
    data = {"page": "tarefas"}
    return render_template('tarefas.html', data=data)


@app.route('/tarefas/criar')
def tarefasCriar():
    data = {"page": "tarefas", "typer": 0}
    return render_template('tarefasRegisto.html', data=data)


@app.route('/tarefas/<int:tarefa>')
def tarefasEdit(tarefa):
    data = {"page": "tarefas", "typer": 0}
    return render_template('tarefasViewEdit.html', data=data)



@app.route('/upload', methods=['POST'])
def upload():
    print(request.files)
    return "aa"
