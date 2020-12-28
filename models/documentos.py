from db import db


class Documento(db.Model):
    __tablename__ = 'documento'
    idDocumento = db.Column(db.Integer, primary_key=True)
    idTarefa = db.Column(db.Integer, db.ForeignKey('tarefa.idTarefa'))
    localizacao = db.Column(db.String(255), nullable=False)

    def __init__(self):
        self.idDocumento = ""
        self.idTarefa = ""
        self.localizacao = ""

    def __repr__(self):
        return {'idDocumento': self.idDocumento,
                'idTarefa':  self.idTarefa,
                'localizacao': self.localizacao}
