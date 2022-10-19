from flask import Flask, request
from api.function_db import *
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/")
def helloWorld():
    return "helloWorld"

@app.route("/api/login", methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    result = execute_login(username, password)
    return result

@app.route("/api/register", methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    phone = request.json.get('phone')
    type = request.json.get('type')
    result = execute_register(username, password, email, phone, type)
    return result
