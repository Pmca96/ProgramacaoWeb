from ma import ma
from models.calendario import Calendario


class CalendarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Calendario
        dump_only = ("idCalendario",)
        include_fk = True
        load_instance = True
        include_relationships = True
