from flask import Flask, render_template, redirect, request
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from blacklist import blacklist
from flask import Flask, jsonify
from flask_restful import Api

from db import db
from models.documentos import Documento
from models.users import User, Contactos
from models.tarefas import usersTarefas, Tarefa
from resources.users import UserLogin

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_SECRET_KEY'] = 'Pedro'  # Change this!
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']
api = Api(app)

jwt = JWTManager(app)

db.init_app(app)

# execute after the first request
@app.before_request
def create_tables():
    db.create_all()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


api.add_resource(UserLogin, "/api/login")


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


if __name__ == "__main__":
    app.run(port=5000, debug=True)
