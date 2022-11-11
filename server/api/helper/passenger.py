import mysql.connector
from datetime import datetime
from sqlite3 import OperationalError
from api.helper.model import Trip
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="12345678",
    database="WCP_DB",
)   

cursor = db.cursor()

def execute_passengerJoinTrip(driverId, vehicleId, tripId, passengerId):
    # check if the vehicle is full
    sql_command_vehicle = "SELECT capacity FROM Vehicle WHERE driverID = %s AND vehicleID = %s"
    val_vehicle = (driverId, vehicleId)
    cursor.execute(sql_command_vehicle, val_vehicle)
    result = cursor.fetchone()
    vehicleCapacity = result[0] if result != None else None
    if vehicleCapacity == None: 
        return { "status": "Fail", "errorMessage": "ERROR: Vehicle does not exist" }
    sql_command_travelled = "SELECT count(*) FROM Travelled WHERE driverID = %s AND vehicleID = %s AND tripID = %s"
    val_travelled = (driverId, vehicleId, tripId)
    cursor.execute(sql_command_travelled, val_travelled)
    result = cursor.fetchone()
    curJoinNum = result[0] if result != None else 0
    print(curJoinNum)
    if curJoinNum >= vehicleCapacity:
        return { "status": "Fail", "errorMessage": "ERROR: Vehicle has reached its maximum capacity" }
    # check if current passenger is already joined in the trip
    sql_command_passenger_in_trip = "SELECT count(*) FROM Travelled WHERE driverID = %s AND vehicleID = %s AND tripID = %s and passengerID = %s"
    val_passenger_in_trip = (driverId, vehicleId, tripId, passengerId)
    cursor.execute(sql_command_passenger_in_trip, val_passenger_in_trip)
    result = cursor.fetchone()
    curPassengerJoinNum = result[0] if result != None else 0
    if curPassengerJoinNum != 0:
        return { "status": "Fail", "errorMessage": "ERROR: Current passenger is already in the trip" }

    try:
        sql_command = "INSERT INTO Travelled VALUES (%s, %s, %s, %s, %s)"
        val = (driverId, vehicleId, tripId, passengerId, None)
        cursor.execute(sql_command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_passengerLeaveTrip(driverId, vehicleId, tripId, passengerId):
    try:
        sql_command = "DELETE FROM Travelled WHERE driverId = %s AND vehicleId = %s AND tripId = %s AND passengerId = %s"
        val = (driverId, vehicleId, tripId, passengerId)
        cursor.execute(sql_command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return { "status": "Success" }

def execute_passengerGetOwnTrips(passengerId):
    sql_command = """SELECT t.driverId, t.vehicleId, t.tripId, t.origin, t.destination, t.departTime, t.price, t.desciption
                        FROM Trip t
                        RIGHT JOIN
                        (SELECT * FROM Travelled WHERE passengerID = %s) travelled
                                                ON t.driverID = travelled.driverID AND 
                                                t.vehicleID = travelled.vehicleID AND t.tripID = travelled.tripID;"""
    val = (passengerId,)
    cursor.execute(sql_command, val)
    passengerTrips = []
    result = cursor.fetchall()
    for row in result:
        trip = Trip(row).__dict__
        passengerTrips.append(trip)
    return json.dumps(passengerTrips, default=str)
