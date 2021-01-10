from db import db


class Documento(db.Model):
    __tablename__ = 'documento'
    idDocumento = db.Column(db.Integer, primary_key=True)
    idTarefa = db.Column(db.Integer, db.ForeignKey('tarefa.idTarefa'))
    nome = db.Column(db.String(50), nullable=False)
    localizacao = db.Column(db.String(255), nullable=False)

    def __init__(self):
        self.idTarefa = ""
        self.localizacao = ""
        self.nome = ""

    @classmethod
    def find_by_id(self, idDocumento):
        return self.query.filter_by(idDocumento=idDocumento).first()

    @classmethod
    def find_by_tarefa(self,idTarefa):
        return self.query.filter_by(idTarefa=idTarefa).all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return {'idDocumento': self.idDocumento,
                'idTarefa':  self.idTarefa,
                'localizacao': self.localizacao}
