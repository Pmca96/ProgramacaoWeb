from ma import ma
from models.users import User, Contactos


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_only = ("password",)
        dump_only = ("idUser",)
        include_fk = True
        load_instance = True
        include_relationships = True

class ContactosSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Contactos
        include_fk = True
        load_instance = True
