import os
import time

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_claims

from models.documentos import Documento
from models.tarefas import Tarefa


class DocumentoId(Resource):

    @classmethod
    @jwt_required
    def post(cls, id: int):
        tarefa = Tarefa.find_by_id(id)
        claims = get_jwt_claims()
        if tarefa:
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
            return {'msg': 'Documento/s adicionado à tarefa com sucesso'}, 200
        return {'msg': 'Tarefa não foi encontrado'}, 401

    @classmethod
    @jwt_required
    def delete(cls, id: int):
        documento = Documento.find_by_id(id)
        if documento:
            try:
                os.remove("static/"+documento.localizacao)
            except:
                pass
            documento.delete_from_db()
            return {'msg': 'Documento apagado com sucesso'}, 200
        return {'msg': 'Documento não foi encontrado'}, 401
