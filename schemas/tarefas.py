from ma import ma
from models.tarefas import Tarefa


class TarefaSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Tarefa
        dump_only = ("idTarefa",)
        include_fk = True
        load_instance = True
        include_relationships = True
