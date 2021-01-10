import json
import os
import time

from flask import request
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_claims

from models.calendario import Calendario
from models.documentos import Documento
from models.tarefas import Tarefa
from schemas.calendario import CalendarioSchema
from schemas.documentos import DocumentoSchema

Documento_schema = DocumentoSchema()
Documento_list_schema = DocumentoSchema(many=True)
Calendario_schema = CalendarioSchema()

class DocumentoId(Resource):

    @classmethod
    @jwt_required
    def get(cls, id: int):

        tarefa = Tarefa.find_by_id(id)
        claims = get_jwt_claims()
        if tarefa:
            documentosTarefas = Documento.find_by_tarefa(id)
            return Documento_list_schema.dump(documentosTarefas), 200
        return {'msg': 'Tarefa não foi encontrado'}, 401

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
                Doc.nome = file.filename[0:50]
                Doc.save_to_db()
                i += 1

            documentosTarefas = Documento.find_by_tarefa(id)

            return Documento_list_schema.dump(documentosTarefas), 200
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


class DocumentoAgendamentoId(Resource):

    @classmethod
    @jwt_required
    def get(cls, id: int):
        calen = Calendario.find_by_id(id)
        listDocuments = []
        if calen:
            calenjson = Calendario_schema.dump(calen)
            print(calenjson)
            for i in calenjson['tarefas']:
                taref = Tarefa.find_by_id(i)
                documentosTarefas = Documento.find_by_tarefa(int(taref.idTarefa))
                print( Documento_list_schema.dump(documentosTarefas))
                print(taref.idTarefa)
                listDocuments.append(Documento_list_schema.dump(documentosTarefas))

            listDocuments
            return listDocuments, 200
        return {'msg' : 'Não foram encontrados registos'}, 401
