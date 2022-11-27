import mysql.connector
from datetime import datetime
from sqlite3 import OperationalError
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

def execute_getAvailableTrips():
    trips = []
    curtime = datetime.now()
    command = "SELECT * FROM Trip WHERE departTime >= %s ORDER BY departTime"
    val = (curtime,)
    cursor.execute(command, val)
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
        departFrom = datetime.strptime(departTimeStart, "%Y/%m/%d %H:%M")
        fields.append("departTime >= '" + str(departFrom) + "'")
    if departTimeEnd:
        departTo = datetime.strptime(departTimeEnd, "%Y/%m/%d %H:%M")
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
    cursor.execute(command)
    result = cursor.fetchall()
    for row in result:
        trip = Trip(row).__dict__
        trips.append(trip)
    return json.dumps(trips, default=str)
