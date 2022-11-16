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

def execute_getTrips():
    trips = []
    command = "SELECT * FROM Trip"
    cursor.execute(command)
    result = cursor.fetchall()
    for row in result:
        trip = Trip(row).__dict__
        trips.append(trip)
    return json.dumps(trips, default=str)

def execute_searchTrips(origin, destination, departTimeStart, departTimeEnd, priceLow, priceHigh):
    trips = []
    command = "SELECT * FROM Trip"
    fields = []
    if origin:
        fields.append("origin = '" + origin + "'")
    if destination:
        fields.append("destination = '" + destination + "'")
    if departTimeStart:
        departFrom = datetime.strptime(departTimeStart, "%m/%d/%Y %H:%M %p")
        fields.append("departTime >= '" + str(departFrom) + "'")
    if departTimeEnd:
        departTo = datetime.strptime(departTimeEnd, "%m/%d/%Y %H:%M %p")
        fields.append("departTime <= '" + str(departTo) + "'")
    if priceLow:
        fields.append("price >= " + str(priceLow))
    if priceHigh:
        fields.append("price <= " + str(priceHigh))
    if len(fields) > 0:
        command += " WHERE"
        for field in fields:
            command += " " + field + " AND"
        command = command[:len(command) - 4]
        print(command)
    cursor.execute(command)
    result = cursor.fetchall()
    for row in result:
        trip = Trip(row).__dict__
        trips.append(trip)
    return json.dumps(trips, default=str)
