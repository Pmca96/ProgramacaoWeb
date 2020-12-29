from flask import request
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_raw_jwt, get_jwt_claims

from blacklist import blacklist
from models.users import User
from schemas.users import UserSchema

User_schema = UserSchema()
User_list_schema = UserSchema(many=True)


class UserLogin(Resource):
    @classmethod
    def post(cls):
        email = request.form["email"]
        password = request.form["password"]
        user = User.authenticate(email, password)
        if not user:
            return {"msg": "Password ou email incorretos"}, 401

        access_token = create_access_token(identity={"email": user.email, "id": user.idUser})
        return {'access_token': "Bearer " + access_token, 'idUser': user.idUser}, 200

    @classmethod
    @jwt_required
    def delete(cls):
        jti = get_raw_jwt()['jti']
        blacklist.add(jti)
        return {"msg": "Terminada a sessão com sucesso"}, 200


class UserGeral(Resource):
    @classmethod
    def post(cls):
        if not User().find_by_email(request.form["email"]):
            u = User()
            u.email = request.form["email"]
            u.password = request.form["password"]
            u.name = request.form["name"]
            u.save_to_db()
            return {"msg": "Utilizador criado com sucesso"}, 200
        else:
            return {"msg": "Email já existe"}, 401

    @classmethod
    @jwt_required
    def get(cls):
        claims = get_jwt_claims()
        userMe = User.find_by_id(claims['id'])

        #cia lista de contactos associados ao utilizador autenticado (pelo próprio e por outros)
        todosOsContactos = []
        for assoc in userMe.contactos:
            todosOsContactos.append(assoc.uidUserContacto)

        for assoc in userMe.contactosTo:
            todosOsContactos.append(assoc.uidUser)

        listToStr = "','".join([str(elem) for elem in todosOsContactos])
        listToStr1 = "'" + listToStr + "'"

        if len(request.args) == 0 and request.args.get("search") is None and request.args.get("searchToAdd") is None:
            return {"msg": "Falta parametros"}, 401
        elif request.args.get("search") is not None:
            data = User.find_by_all_associated(request.args.get("search"), listToStr1)
            return User_list_schema.dump(data), 200
        elif request.args.get("searchToAdd") is not None:
            listToStr1 += ",'" + str(claims['id']) + "'"
            data = User.find_by_all_notAssociated(request.args.get("searchToAdd"), listToStr1)
            return User_list_schema.dump(data), 200
        else:
            return {"msg": "Falta parametros"}, 401
