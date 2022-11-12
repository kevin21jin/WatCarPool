import mysql.connector
from datetime import datetime
from sqlite3 import OperationalError
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="12345678",
    database="WCP_DB",
)

cursor = db.cursor()

def execute_registerVehicle(driverID, model, capacity):
    command = "SELECT MAX(vehicleID) FROM Vehicle WHERE driverID = %s"
    val = (driverID,)
    cursor.execute(command, val)
    result = cursor.fetchone()
    vehicleID = result[0] + 1
    try:
        command = "INSERT INTO Vehicle VALUES (%s, %s, %s, %s)"
        val = (driverID, vehicleID, model, capacity)
        cursor.execute(command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_createTrip(driverID, vehicleID, origin, destination, departTime, price, description):
    command = "SELECT MAX(TripID) FROM Trip WHERE driverID = %s AND vehicleID = %s"
    val = (driverID, vehicleID)
    cursor.execute(command, val)
    result = cursor.fetchone()
    tripID = result[0] + 1
    time = datetime.strptime(departTime, "%Y-%m-%d %H:%M:%S")
    if time <= datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trip time must be greater than the current time" }
    if origin == destination:
        return { "status": "Fail", "errorMessage": "ERROR: Origin and destination must be different" }
    try:
        command = "INSERT INTO Trip VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        val = (driverID, vehicleID, tripID, origin, destination, departTime, price, description)
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

def execute_updateTrip(driverID, vehicleID, tripID, origin, destination, departTime, price, description):
    command = "SELECT departTime FROM Trip WHERE driverID = %s AND vehicleID = %s AND tripID = %s"
    val = (driverID, vehicleID, tripID)
    cursor.execute(command, val)
    result = cursor.fetchone()
    time = result[0]
    if time <= datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trips cannot be modified after the depart time" }
    time = datetime.strptime(departTime, "%Y-%m-%d %H:%M:%S")
    if time <= datetime.now():
        return { "status": "Fail", "errorMessage": "ERROR: Trip time must be greater than the current time" }
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

