from flask import Flask, request
from api.helper.login import *
from api.helper.trip import *
from api.helper.driver import *
from api.helper.passenger import *
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
    type = request.json.get('isDriver')
    result = execute_register(username, password, email, phone, type)
    return result

@app.route("/api/trips", methods=['GET'])
def getTrips():
    result = execute_getTrips()
    return result

@app.route("/api/trips/join", methods=['POST'])
def joinTrip():
    driverId = request.json.get('driverId')
    vehicleId = request.json.get('vehicleId')
    tripId = request.json.get('tripId')
    passengerId = request.json.get('passengerId')
    result = execute_passengerJoinTrip(driverId, vehicleId, tripId, passengerId)
    return result
