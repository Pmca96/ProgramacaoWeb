from flask import session

from db import db


class User(db.Model):
    __Tablename__ = 'user'
    idUser = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(255))
    tarefas = db.relationship("tarefa", backref="tarefa.idTarefa")
    contactos = db.relationship("contactos", backref="User", lazy='dynamic')
    contactosTo = db.relationship("contactos", backref="UserContacto", lazy='dynamic')

    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = password

    def __init__(self):
        self.email = ""
        self.name = ""
        self.password = ""

    @staticmethod
    def authenticate(email, password):
        return User.query.filter(email=email, password=password).first()

    def save_to_db(self) -> None:
        session.add(self)
        session.commit()

    def delete_from_db(self) -> None:
        session.delete(self)
        session.commit()

    def __repr__(self):
        return {'email': self.email, 'name': self.name},


class Contactos(db.Model):
    __Tablename__ = 'contactos'
    id = db.Column(db.Integer, primary_key = True)
    uidUser = db.Column(db.Integer, db.ForeignKey('user.idUser'))
    uidUserContacto = db.Column(db.Integer, db.ForeignKey('user.idUser'))
    accepted = db.Column(db.Boolean, default=False, nullable=False)


# class User(db.Model):
#     __tablename__ = 'User'
#     ID = db.Column(db.Integer, primary_key=True)
#     FirstName = db.Column(db.String(64))
#     LastName = db.Column(db.String(64))
#     Email = db.Column(db.String(64), unique=True)
#     PwdHash = db.Column(db.String(100))
#     Payments = db.relationship("Payment", backref="Payer", lazy = "dynamic")
#     Received = db.relationship("Payment", backref="Receiver", lazy = "dynamic")
#
# class Payment(db.Model):
#     __tablename__ = "Payment"
#     id = db.Column(db.Integer, primary_key = True)
#     uidPayer = db.Column(db.Integer, db.ForeignKey("User.ID"))
#     uidReceiver = db.Column(db.Integer, db.ForeignKey("User.ID"))
#     amount = db.Column(db.Float)
