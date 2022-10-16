import mysql.connector

def createUser(db):
    cursor = db.cursor()
    path = f'./database/data/user.txt'
    fd = open(path, 'r')
    for line in fd:
        print(line)
        data = line.split(',')
        command = 'INSERT INTO User (userID, username, password, email, phone, type, joinedAt) VALUES (%s, %s, %s, %s, %s, %s, %s)'
        cursor.execute(command, data)
    fd.close()
    db.commit()

def createPassenger(db):
    cursor = db.cursor()
    path = f'./database/data/passenger.txt'
    fd = open(path, 'r')
    for line in fd:
        print(line)
        data = line.split(',')
        command = 'INSERT INTO Passenger (userID) VALUES (%s)'
        cursor.execute(command, data)
    fd.close()
    db.commit()

def createDriver(db):
    cursor = db.cursor()
    path = f'./database/data/driver.txt'
    fd = open(path, 'r')
    for line in fd:
        print(line)
        data = line.split(',')
        command = 'INSERT INTO Driver (userID, rating) VALUES (%s, %s)'
        cursor.execute(command, data)
    fd.close()
    db.commit()

def createVehicle(db):
    cursor = db.cursor()
    path = f'./database/data/vehicle.txt'
    fd = open(path, 'r')
    for line in fd:
        print(line)
        data = line.split(',')
        command = 'INSERT INTO Vehicle (vehicleID, driverID, model, capacity) VALUES (%s, %s, %s, %s)'
        cursor.execute(command, data)
    fd.close()
    db.commit() 

def createTrip(db):
    cursor = db.cursor()
    path = f'./database/data/trip.txt'
    fd = open(path, 'r')
    for line in fd:
        print(line)
        data = line.split(',')
        command = 'INSERT INTO Trip (tripID, driverID, vehicleID, origin, destination, departTime, description) VALUES (%s, %s, %s, %s, %s, %s, %s)'
        cursor.execute(command, data)
    fd.close()
    db.commit() 

def createTravelled(db):
    cursor = db.cursor()
    path = f'./database/data/travelled.txt'
    fd = open(path, 'r')
    for line in fd:
        print(line)
        data = line.split(',')
        command = 'INSERT INTO Travelled (tripID, passengerID, rating) VALUES (%s, %s, %s)'
        cursor.execute(command, data)
    fd.close()
    db.commit() 
 
def populateTables():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="12345678",
        database="WCP_DB",
        )
    createUser(db)
    # createPassenger()
    # createDriver()
    # createVehicle()
    # createTrip()
    # createTravelled()
