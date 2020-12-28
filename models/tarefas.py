from db import db

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

    documentos = db.relationship("documento")
    usersTarefas = db.relationship("user", secondary=usersTarefas, backref="Users")

    def __init__(self):
        self.idTarefa = ""
        self.name = ""
        self.descricao = ""

    def __repr__(self):
        return {'idTarefa': self.idTarefa, 'name': self.name, 'descricao': self.descricao, 'estado': self.estado},
