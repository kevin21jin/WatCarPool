from flask import Flask, request
from api.helper.login import *
from api.helper.trip import *
from api.helper.driver import *
from api.helper.passenger import *
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)

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

@app.route("/api/trips", methods=['GET'])
def getTrips():
    result = execute_getTrips()
    return result

@app.route("/api/trips/search", methods=['POST'])
def searchTrip():
    origin = request.json.get('origin')
    destination = request.json.get('destination')
    departTimeStart = request.json.get('departTimeStart')
    departTimeEnd = request.json.get('departTimeEnd')
    priceLow = request.json.get('priceLow')
    priceHigh = request.json.get('priceHigh')
    result = execute_searchTrips(origin, destination, departTimeStart, departTimeEnd, priceLow, priceHigh)
    return result

@app.route("/api/trips/create", methods=['POST'])
def createTrip():
    driverID = request.json.get('driverID')
    vehicleID = request.json.get('vehicleID')
    origin = request.json.get('origin')
    destination = request.json.get('destination')
    departTime = request.json.get('departTime')
    price = request.json.get('price')
    description = request.json.get('description')
    result = execute_createTrip(driverID, vehicleID, origin, destination, departTime, price, description)
    return result

@app.route("/api/trips/delete", methods=['POST'])
def deleteTrip():
    driverID = request.json.get('driverID')
    vehicleID = request.json.get('vehicleID')
    tripID = request.json.get('tripID')
    result = execute_deleteTrip(driverID, vehicleID, tripID)
    return result

@app.route("/api/trips/update", methods=['PUT'])
def updateTrip():
    driverID = request.json.get('driverID')
    vehicleID = request.json.get('vehicleID')
    tripID = request.json.get('tripID')
    origin = request.json.get('origin')
    destination = request.json.get('destination')
    departTime = request.json.get('departTime')
    price = request.json.get('price')
    description = request.json.get('description')
    result = execute_updateTrip(driverID, vehicleID, tripID, origin, destination, departTime, price, description)
    return result

@app.route("/api/trips/join", methods=['POST'])
def joinTrip():
    driverID = request.json.get('driverID')
    vehicleID = request.json.get('vehicleID')
    tripID = request.json.get('tripID')
    passengerID = request.json.get('passengerID')
    result = execute_passengerJoinTrip(driverID, vehicleID, tripID, passengerID)
    return result

@app.route("/api/trips/leave", methods=['POST'])
def leaveTrip():
    driverID = request.json.get('driverID')
    vehicleID = request.json.get('vehicleID')
    tripID = request.json.get('tripID')
    passengerID = request.json.get('passengerID')
    result = execute_passengerLeaveTrip(driverID, vehicleID, tripID, passengerID)
    return result

@app.route("/api/vehicle/register", methods=['POST'])
def registerVehicle():
    driverID = request.json.get('driverID')
    model = request.json.get('model')
    capacity = request.json.get('capacity')
    result = execute_registerVehicle(driverID, model, capacity)
    return result

@app.route("/api/vehicles", methods=['POST'])
def getVehicles():
    driverID = request.json.get('driverID')
    result = execute_getVehicles(driverID)
    return result

@app.route("/api/trips/passenger", methods=['POST'])
def getTripsByPassenger():
    passengerID = request.json.get('passengerID')
    result = execute_passengerGetTrips(passengerID)
    return result

@app.route("/api/trips/driver", methods=['POST'])
def getTripsByDriver():
    driverID = request.json.get('driverID')
    result = execute_driverGetTrips(driverID)
    return result

@app.route("/api/trip/rating", methods=["PUT"])
def submitRating():
    driverID = request.json.get('driverID')
    vehicleID = request.json.get('vehicleID')
    tripID = request.json.get('tripID')
    passengerID = request.json.get('passengerID')
    rating = request.json.get('rating')
    result = execute_passengerSubmitRating(driverID, vehicleID, tripID, passengerID, rating)
    return result