from flask import Flask, render_template, redirect, request
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from blacklist import blacklist
from flask import Flask, jsonify
from flask_restful import Api

from db import db
from ma import ma
from models.documentos import Documento
from models.calendario import Calendario
from models.users import User, Contactos
from models.tarefas import usersTarefas, Tarefa
from resources.contactos import ContactosId
from resources.documentos import DocumentoId
from resources.tarefas import TarefaGeral, TarefaId

from routes.main import main

from resources.users import UserLogin, UserGeral
from resources.calendario import CalendarioGeral, CalendarioId

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config['JWT_SECRET_KEY'] = 'Pedro'  # Change this!
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False

api = Api(app)
jwt = JWTManager(app)
db.init_app(app)
ma.init_app(app)


# execute after the first request
@app.before_request
def create_tables():
    db.create_all()


@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist


@jwt.user_claims_loader
def add_claims_to_jwt(identity):
    return {
        'id': identity["id"],
        'email': identity["email"]
    }


api.add_resource(UserLogin, "/api/login")
api.add_resource(UserGeral, "/api/user")
api.add_resource(CalendarioGeral, "/api/calendario")
api.add_resource(CalendarioId, "/api/calendario/<int:id>")
api.add_resource(ContactosId, "/api/contacto/<int:id>")

api.add_resource(TarefaGeral, "/api/tarefa")
api.add_resource(TarefaId, "/api/tarefa/<int:id>")

api.add_resource(DocumentoId, "/api/documento/<int:id>")

app.register_blueprint(main)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
