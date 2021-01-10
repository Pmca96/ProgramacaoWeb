from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_claims

from models.calendario import Calendario
from models.tarefas import Tarefa
from models.users import User
from schemas.calendario import CalendarioSchema

Calendario_schema = CalendarioSchema()
Calendario_list_schema = CalendarioSchema(many=True)


class CalendarioId(Resource):
    @jwt_required
    def get(cls, id: int):
        calendario = Calendario().find_by_id(id)
        if not calendario:
            return {'msg': 'Agendamento não foi encontrado'}, 401
        else:
            return Calendario_schema.dump(calendario), 200

    @jwt_required
    def put(cls, id: int):
        claims = get_jwt_claims()

        calendario = Calendario().find_by_id(id)
        if not calendario:
            return {'msg': 'Não foi encontrado o agendamento'}, 401
        else:
            if 'title' in request.get_json():
                calendario.title = request.get_json()['title']
            if 'start' in request.get_json():
                calendario.start = request.get_json()['start']
            if 'end' in request.get_json():
                calendario.end = request.get_json()['end']
            if 'gps' in request.get_json():
                calendario.gps = request.get_json()['gps']
            if 'descricao' in request.get_json():
                calendario.descricao = request.get_json()['descricao']
            if 'users' in request.get_json():
                calendario.users.clear()
                for user in request.get_json()['users']:
                    calendario.users.append(User.find_by_id(user))

            calendario.users.append(User.find_by_id(claims['id']))

            if 'tarefas' in request.get_json():
                calendario.tarefas.clear()
                for tarefa in request.get_json()['tarefas']:
                    calendario.tarefas.append(Tarefa.find_by_id(tarefa))
            calendario.save_to_db()
            return Calendario_schema.dump(calendario), 200
    @jwt_required
    def delete(cls, id: int):
        calendario = Calendario.find_by_id(id)
        if calendario:
            calendario.delete_from_db()
            return {"msg":"Eliminado"}, 200

        return {"msg": "Nao foi encontrado o registo"}, 401

class CalendarioGeral(Resource):
    @jwt_required
    def post(cls):
        claims = get_jwt_claims()

        calendario = Calendario()
        calendario.title = request.get_json()['title']
        calendario.start = request.get_json()['start']
        calendario.end = request.get_json()['end']
        calendario.gps = request.get_json()['gps']
        calendario.descricao = request.get_json()['descricao']
        if 'users' in request.get_json():
            calendario.users.clear()
            for user in request.get_json()['users']:
                calendario.users.append(User.find_by_id(user))

        calendario.users.append(User.find_by_id(claims['id']))

        if 'tarefas' in request.get_json():
            calendario.tarefas.clear()
            for tarefa in request.get_json()['tarefas']:
                calendario.tarefas.append(Tarefa.find_by_id(tarefa))
        calendario.save_to_db()
        return Calendario_schema.dump(calendario), 200

    @jwt_required
    def get(self):
        claims = get_jwt_claims()
        if len(request.args) == 0 or request.args.get("month") is None:
            return {"msg": "Falta parametros"}, 401
        else:
            return Calendario_list_schema.dump(Calendario().find_for_user_month(claims['id'], request.args.get("month"))), 200
