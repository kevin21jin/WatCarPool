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


def execute_passengerGetTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0
