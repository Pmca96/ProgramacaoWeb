from sqlalchemy import or_
from db import db
from models.tarefas import Tarefa

calendarioUsers = db.Table('calendarioUsers',
                           db.Column('uidCalendario', db.Integer, db.ForeignKey('calendario.idCalendario'),
                                     primary_key=True),
                           db.Column('uidUsers', db.Integer, db.ForeignKey('user.idUser'), primary_key=True)
                           )

calendarioTarefas = db.Table('calendarioTarefas',
                             db.Column('uidCalendario', db.Integer, db.ForeignKey('calendario.idCalendario'),
                                       primary_key=True),
                             db.Column('uidTarefas', db.Integer, db.ForeignKey('tarefa.idTarefa'), primary_key=True)
                             )


# class CalendarioUsers(db.Model):
#     __Tablename__ = 'calendarioUsers'
#     uidCalendario = db.Column(db.Integer, db.ForeignKey('calendario.idCalendario'), primary_key=True)
#     uidUsers = db.Column(db.Integer, db.ForeignKey('user.idUser'), primary_key=True)
#
# class CalendarioTarefas(db.Model):
#     __Tablename__ = 'calendarioTarefas'
#     uidCalendario = db.Column(db.Integer, db.ForeignKey('calendario.idCalendario'), primary_key=True)
#     uidTarefas = db.Column(db.Integer, db.ForeignKey('tarefa.idTarefa'), primary_key=True)
#


class Calendario(db.Model):
    __Tablename__ = 'calendario'
    idCalendario = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    start = db.Column(db.String(20))
    end = db.Column(db.String(20))
    gps = db.Column(db.String(512))
    descricao = db.Column(db.String(512))

    # tarefas = db.relationship("CalendarioTarefas", backref="Calendario", lazy='dynamic', foreign_keys='CalendarioTarefas.uidCalendario')
    # users = db.relationship("CalendarioUsers", backref="Calendario", lazy='dynamic', foreign_keys='CalendarioUsers.uidCalendario')
    users = db.relationship("User", secondary=calendarioUsers)
    tarefas = db.relationship("Tarefa", secondary=calendarioTarefas)

    def __init__(self):
        self.title = ""
        self.start = ""
        self.end = ""
        self.gps = ""
        self.descricao = ""

    @classmethod
    def find_by_id(self, idCalendario):
        return self.query.filter_by(idCalendario=idCalendario).first()

    @classmethod
    def find_for_user_month(self, user, month):
        splitedMonth = month.split("-")
        monthMinus = ""
        monthPlus = ""
        if splitedMonth[1] == "12":
            monthPlus = str(int(splitedMonth[0]) + 1) + "-01"
            monthMinus = splitedMonth[0] + "-11"
        elif splitedMonth[1] == "01":
            monthPlus = splitedMonth[0] + "-02"
            monthMinus = str(int(splitedMonth[0]) - 1) + "-12"
        else:
            monthPlus = splitedMonth[0] + "-" + str(int(splitedMonth[1]) + 1)
            monthMinus = splitedMonth[0] + "-" + str(int(splitedMonth[1]) - 1)

        quer1 = Calendario.query.join(Calendario.users, aliased=True) \
            .filter_by(idUser=user).filter(
            or_(Calendario.start.contains(monthPlus), Calendario.start.contains(monthMinus),
                Calendario.start.contains(month),
                Calendario.end.contains(monthPlus), Calendario.end.contains(monthMinus),
                Calendario.end.contains(month)))

        #testar query2
        quer2 = Calendario.query.join(Calendario.tarefas, aliased=True).join(Tarefa.usersTarefas, aliased=True) \
            .filter_by(idUser=user).filter(
            or_(Calendario.start.contains(monthPlus), Calendario.start.contains(monthMinus),
                Calendario.start.contains(month),
                Calendario.end.contains(monthPlus), Calendario.end.contains(monthMinus),
                Calendario.end.contains(month)))

        return quer1.union(quer2)

    def save_to_db(self) -> None:
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self) -> None:
        db.session.delete(self)
        db.session.commit()
