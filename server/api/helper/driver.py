import mysql.connector
from datetime import datetime
from sqlite3 import OperationalError
from api.helper.model import Vehicle
from api.helper.model import Trip
import json

path = open('../mysqlConfig.json')
config = json.load(path)
db = mysql.connector.connect(
    host=config['host'],
    user=config['user'],
    password=config['password'],
    database="WCP_DB",
)

cursor = db.cursor()

def execute_registerVehicle(driverID, model, capacity):
    command = "SELECT MAX(vehicleID) FROM Vehicle WHERE driverID = %s"
    val = (driverID,)
    cursor.execute(command, val)
    result = cursor.fetchone()
    vehicleID = (result[0] + 1) if result[0] is not None else 1
    try:
        command = "INSERT INTO Vehicle VALUES (%s, %s, %s, %s)"
        val = (driverID, vehicleID, model, capacity)
        cursor.execute(command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_getVehicles(driverID):
    vehicles = []
    command = "SELECT * FROM Vehicle WHERE driverID = %s"
    val = (driverID,)
    cursor.execute(command, val)
    result = cursor.fetchall()
    for row in result:
        vehicle = Vehicle(row).__dict__
        vehicles.append(vehicle)
    return json.dumps(vehicles, default=str)

def execute_createTrip(driverID, vehicleID, origin, destination, departTime, price, description):
    command = "SELECT MAX(TripID) FROM Trip WHERE driverID = %s AND vehicleID = %s"
    val = (driverID, vehicleID)
    cursor.execute(command, val)
    result = cursor.fetchone()
    tripID = (result[0] + 1) if result[0] is not None else 1
    time = datetime.strptime(departTime, "%Y/%m/%d %H:%M")
    if time <= datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trip time must be greater than the current time" }
    if vehicleID == "":
        return { "status": "Fail", "errorMessage": "ERROR: You muse select a vehicle" }
    if origin == "":
        return { "status": "Fail", "errorMessage": "ERROR: Origin must not be empty" }
    if destination == "":
        return { "status": "Fail", "errorMessage": "ERROR: Destination must not be empty" }
    if origin == destination:
        return { "status": "Fail", "errorMessage": "ERROR: Origin and destination must be different" }
    if float(price) < 0 or float(price) > 150:
        return { "status": "Fail", "errorMessage": "ERROR: Trip price must be between 0 and 150"}
    try:
        command = "INSERT INTO Trip VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val = (driverID, vehicleID, tripID, origin, destination, time, price, description)
        cursor.execute(command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_deleteTrip(driverID, vehicleID, tripID):
    command = "SELECT departTime FROM Trip WHERE driverID = %s AND vehicleID = %s AND tripID = %s"
    val = (driverID, vehicleID, tripID)
    cursor.execute(command, val)
    result = cursor.fetchone()
    time = result[0]
    if time <= datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trips cannot be deleted after the depart time" }
    try:
        command = "DELETE FROM Trip WHERE driverID = %s AND vehicleID = %s AND tripID = %s"
        val = (driverID, vehicleID, tripID)
        cursor.execute(command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_finishTrip(driverID, vehicleID, tripID):
    command = "SELECT departTime FROM Trip WHERE driverID = %s AND vehicleID = %s AND tripID = %s"
    val = (driverID, vehicleID, tripID)
    cursor.execute(command, val)
    result = cursor.fetchone()
    time = result[0]
    if time > datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trips cannot be deleted before the depart time" }
    try:
        command = "DELETE FROM Trip WHERE driverID = %s AND vehicleID = %s AND tripID = %s"
        val = (driverID, vehicleID, tripID)
        cursor.execute(command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_updateTrip(driverID, vehicleID, tripID, origin, destination, departTime, price, description):
    command = "SELECT departTime FROM Trip WHERE driverID = %s AND vehicleID = %s AND tripID = %s"
    val = (driverID, vehicleID, tripID)
    cursor.execute(command, val)
    result = cursor.fetchone()
    time = result[0]
    if time <= datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trips cannot be modified after the depart time" }
    time = datetime.strptime(departTime, "%Y/%m/%d %H:%M")
    if time <= datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trip time must be greater than the current time" }
    if origin == "":
        return { "status": "Fail", "errorMessage": "ERROR: Origin must not be empty" }
    if destination == "":
        return { "status": "Fail", "errorMessage": "ERROR: Destination must not be empty" }
    if origin == destination:
        return { "status": "Fail", "errorMessage": "ERROR: Origin and destination must be different" }
    try:
        command = """UPDATE Trip SET origin = %s, destination = %s, departTime = %s, price = %s, description = %s
                     WHERE driverID = %s AND vehicleID = %s AND tripID = %s"""
        val = (origin, destination, departTime, price, description, driverID, vehicleID, tripID)
        cursor.execute(command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_driverGetTrips(driverID):
    command = "SELECT * FROM Trip t WHERE driverID = %s ORDER BY departTime"
    val = (driverID,)
    cursor.execute(command, val)
    driverTrips = []
    result = cursor.fetchall()
    for row in result:
        trip = Trip(row).__dict__
        driverTrips.append(trip)
    return json.dumps(driverTrips, default=str)

def execute_driverGetUpcomingTrips(driverID):
    curtime = datetime.now()
    command = "SELECT * FROM Trip WHERE driverID = %s AND departTime >= %s ORDER BY departTime LIMIT 4"
    val = (driverID, curtime)
    cursor.execute(command, val)
    driverTrips = []
    result = cursor.fetchall()
    for row in result:
        trip = Trip(row).__dict__
        driverTrips.append(trip)
    return json.dumps(driverTrips, default=str)

def execute_driverGetRating(userID):
    command = "SELECT rating FROM Driver WHERE userID = %s"
    val = (userID,)
    cursor.execute(command, val)
    rating = cursor.fetchone()[0]
    return { "rating": rating }
