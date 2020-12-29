from sqlalchemy import or_

from db import db
from models.users import User

usersTarefas = db.Table('usersTarefas',
                        db.Column('idUser', db.Integer, db.ForeignKey('user.idUser'), primary_key=True),
                        db.Column('idTarefa', db.Integer, db.ForeignKey('tarefa.idTarefa'), primary_key=True)
                        )


class Tarefa(db.Model):
    __tablename__ = 'tarefa'
    idTarefa = db.Column(db.Integer, primary_key=True)
    idUser = db.Column(db.Integer, db.ForeignKey('user.idUser'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    descricao = db.Column(db.String(50))
    estado = db.Column(db.Integer, default=0, nullable=False)

    documentos = db.relationship("Documento")
    usersTarefas = db.relationship("User", secondary=usersTarefas, backref="Users")

    def __init__(self):
        self.idUser = ""
        self.name = ""
        self.descricao = ""
        self.estado = "0"

    @classmethod
    def find_by_id(self, idTarefa):
        return self.query.filter_by(idTarefa=idTarefa).first()

    @classmethod
    def find_by_userId(self, idTarefa):
        return self.query.filter_by(idTarefa=idTarefa).first()

    @classmethod
    def find_all(self, idUser):
        #testar
        query1 = db.session.query(Tarefa).join(Tarefa.usersTarefas, isouter=True).filter(or_(User.idUser==idUser, Tarefa.idUser == idUser))
        return query1.all()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return {'idTarefa': self.idTarefa, 'name': self.name, 'descricao': self.descricao, 'estado': self.estado},
