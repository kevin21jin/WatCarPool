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

def execute_passengerJoinTrip(driverId, vehicleId, tripId, passengerId):
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

def execute_passengerGetTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0
