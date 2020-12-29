from sqlalchemy import or_

from db import db



class User(db.Model):
    __Tablename__ = 'user'
    idUser = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(255))

    tarefas = db.relationship("Tarefa")
    contactos = db.relationship("Contactos", backref="User", lazy='dynamic', foreign_keys='Contactos.uidUser')
    contactosTo = db.relationship("Contactos", backref="UserContacto", lazy='dynamic',
                                  foreign_keys='Contactos.uidUserContacto')

    def __init__(self):
        self.email = ""
        self.name = ""
        self.password = ""

    @classmethod
    def find_by_id(self, id):
        return self.query.filter_by(idUser=id).first()

    @classmethod
    def find_by_email(self, email):
        return self.query.filter_by(email=email).first()

    @classmethod
    def find_by_all_associated(self, search, list):
        query = self.query.filter(User.idUser.in_(list)).filter(or_(User.name.contains(search), User.email.contains(search))).all()
        return query


    @classmethod
    def find_by_all_notAssociated(self, search, list):
        query = self.query.filter(~User.idUser.in_(list)).filter(or_(User.name.contains(search), User.email.contains(search))).all()
        return query

    @classmethod
    def authenticate(self, email, password):
        return self.query.filter_by(email=email, password=password).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return {'email': self.email, 'name': self.name},


class Contactos(db.Model):
    __Tablename__ = 'contactos'
    id = db.Column(db.Integer, primary_key=True)
    uidUser = db.Column(db.Integer, db.ForeignKey('user.idUser'))
    uidUserContacto = db.Column(db.Integer, db.ForeignKey('user.idUser'))

    @classmethod
    def find_by_list(self, id1, id2):
        query1 = self.query.join(User.contactos, aliased=True).filter_by(uidUser=id1, uidUserContacto=id2)
        query2 = self.query.join(User.contactosTo, aliased=True).filter_by(uidUser=id2, uidUserContacto=id1)
        return query1.union(query2).first()

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()


