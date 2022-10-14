from flask import Flask, request
from api.function_db import *
app = Flask(__name__)

@app.route("/")
def helloWorld():
    return "helloWorld"

@app.route("/api/login")
def login():
    username = request.args.get('username')
    password = request.args.get('password')
    result = execute_login(username, password)
    return result

@app.route("/api/register", methods=['POST'])
def register():
    username = request.args.get('username')
    password = request.args.get('password')
    email = request.args.get('email')
    phone = request.args.get('phone')
    type = request.args.get('type')
    result = execute_register(username, password, email, phone, type)
    return result
