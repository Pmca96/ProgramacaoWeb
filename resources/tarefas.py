import os
import time

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_claims

from models.documentos import Documento
from models.tarefas import Tarefa
from schemas.tarefas import TarefaSchema

Tarefa_schema = TarefaSchema()
Tarefa_list_schema = TarefaSchema(many=True)


class TarefaId(Resource):
    @classmethod
    @jwt_required
    def get(cls, id: int):
        tarefa = Tarefa.find_by_id(id)
        if tarefa:
            return Tarefa_schema.dump(tarefa), 200
        else:
            return {"msg": "Tarefa não foi encontrada"}, 401

    @classmethod
    @jwt_required
    def put(cls, id: int):
        tarefa = Tarefa.find_by_id(id)
        claims = get_jwt_claims()
        if tarefa:
            if tarefa.idUser != claims['id']:
                return {"msg": "Não tem permissões para editar a tarefa"}, 401
            if 'name' in request.form:
                tarefa.name = request.form["name"]
            if 'descricao' in request.form:
                tarefa.descricao = request.form["descricao"]
            if 'estado' in request.form:
                tarefa.estado = request.form["estado"]

            tarefa.save_to_db()
            return {"msg": "Tarefa alterada com sucesso"}, 200
        else:
            return {"msg": "Tarefa não foi encontrada"}, 401

    @classmethod
    @jwt_required
    def delete(cls, id: int):
        claims = get_jwt_claims()
        tarefa = Tarefa.find_by_id(id)
        if tarefa:
            if tarefa.idUser != claims['id']:
                return {"msg": "Não tem permissões para apagar a tarefa"}, 401

            if len(tarefa.documentos) > 0:
                for doc in tarefa.documentos:
                    try:
                        os.remove("static/" + doc.localizacao)
                    except:
                        pass
                    doc.delete_from_db()
            tarefa.delete_from_db()
            return {"msg": "Tarefa apagada com sucesso"}, 200
        else:
            return {"msg": "Tarefa não foi encontrada"}, 401


class TarefaGeral(Resource):

    @classmethod
    @jwt_required
    def get(cls):
        claims = get_jwt_claims()
        tarefas = Tarefa.find_all(claims['id'])
        return Tarefa_list_schema.dump(tarefas), 200

    @classmethod
    @jwt_required
    def post(cls):
        claims = get_jwt_claims()
        if 'name' not in request.form or 'descricao' not in request.form:
            return {"msg": "Falta parametros"}, 401
        tarefa = Tarefa()
        tarefa.idUser = claims['id']
        tarefa.name = request.form["name"]
        tarefa.descricao = request.form["descricao"]

        if 'estado' in request.form:
            tarefa.estado = request.form["estado"]
        else:
            tarefa.estado = 0
        tarefa.save_to_db()

        i = 0
        while 'documentos' + str(i) in request.files:
            file = request.files['documentos' + str(i)]
            filenameSplitted = file.filename.split(".")
            filename = str(time.time()) + "." + filenameSplitted[len(filenameSplitted) - 1]
            file.save(os.path.join("static/documents", filename))
            Doc = Documento()
            Doc.idTarefa = tarefa.idTarefa
            Doc.localizacao = "documents/" + filename
            Doc.save_to_db()
            i += 1

        return {"msg": "Tarefa criada com sucesso"}, 200
