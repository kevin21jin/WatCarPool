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

def execute_getTrips():
    try:
        response = []
        sql_command = "SELECT * FROM Trip"
        cursor.execute(sql_command)
        result = cursor.fetchall()
        columns = [field[0] for field in cursor.description]
        for row in result:
            d = dict()
            for i in range(len(columns)):
                d[columns[i]] = row[i]
            response.append(d)
        return json.dumps(response, default=str)
    except OperationalError as msg:
        print("Command skipped: ", msg)
    return 0

def execute_driverGetOwnTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0

def execute_driverGetOtherTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0

def execute_driverCreateTrip(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0
