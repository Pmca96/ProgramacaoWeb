from flask import jsonify, request, make_response
from flask_restful import Resource
from flask_jwt_extended import create_access_token, jwt_required, get_raw_jwt

from blacklist import blacklist
from models.users import User


class UserLogin(Resource):
    @classmethod
    def post(cls):
        email = request.form["email"]
        password = request.form["password"]
        user = User.authenticate(password)
        if not user:
            return {"msg": "Bad user name or password"}, 401

        access_token = create_access_token(identity=email)
        return {'access_token': "Bearer "+access_token}, 200

    @classmethod
    @jwt_required
    def delete(cls):
        jti = get_raw_jwt()['jti']
        blacklist.add(jti)
        return {"msg": "Successfully logged out"}, 200


