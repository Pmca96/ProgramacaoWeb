from flask_restful import Resource
from flask_jwt_extended import  jwt_required, get_jwt_claims

from models.users import Contactos, User


class ContactosId(Resource):
    @jwt_required
    def post(cls, id: int):
        claims = get_jwt_claims()
        contacto = Contactos.find_by_list(claims['id'], id)
        if contacto:
            return {"msg": "Contacto já existe na sua lista"}, 401
        elif User.find_by_id(id):
            contacto = Contactos()
            contacto.uidUser = claims['id']
            contacto.uidUserContacto = id
            contacto.save_to_db()
            return {"msg": "Contacto adicionado"}, 200
        else:
            return {"msg": "Contacto não existe"}, 401

    @jwt_required
    def delete(cls, id: int):
        claims = get_jwt_claims()
        contacto = Contactos.find_by_list(claims['id'], id)
        if contacto:
            contacto.delete_from_db()
            return {"msg": "Contacto removido com sucesso"}, 200
        else:
            return {"msg": "Contacto não existe na sua lista"}, 401
