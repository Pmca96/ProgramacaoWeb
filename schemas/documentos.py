from ma import ma
from models.documentos import Documento


class DocumentoSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Documento
        dump_only = ("idDocumento",)
        include_fk = True
        load_instance = True
