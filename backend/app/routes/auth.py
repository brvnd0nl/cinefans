from flask import Blueprint, request, jsonify
from ..services.auth_service import AuthService
from marshmallow import Schema, fields, validate

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

class RegisterSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))

class LoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

@bp.route('/register', methods=['POST'])
def register():
    schema = RegisterSchema()
    try:
        data = schema.load(request.json)
        token = AuthService.register(
            data['username'],
            data['email'],
            data['password']
        )
        return jsonify({'token': token}), 201
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@bp.route('/login', methods=['POST'])
def login():
    schema = LoginSchema()
    try:
        data = schema.load(request.json)
        token = AuthService.login(
            data['email'],
            data['password']
        )
        return jsonify({'token': token}), 200
    except ValueError as e:
        return jsonify({'error': str(e)}), 401
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500