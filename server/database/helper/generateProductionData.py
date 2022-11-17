import random
import datetime as dt
from faker import Faker
from random import randrange
from datetime import datetime
from werkzeug.security import generate_password_hash
from faker_vehicle import VehicleProvider

fake = Faker('en_CA')
fake.add_provider(VehicleProvider)

def generateUsers(total=1000):
    driverIDs = []
    passengerIDs = []
    f = open('data/production/user.txt', 'w')
    for userID in range(1, total + 1):
        username = fake.name()
        while len(username) > 25:
            username = fake.name()
        password = generate_password_hash('12345678')
        email = fake.ascii_email()
        phone = fake.phone_number()
        type = random.choices(['passenger', 'driver'], weights=(75, 25))[0]
        if type == 'passenger': passengerIDs.append(userID)
        else: driverIDs.append(userID)
        start = datetime.strptime('2022-01-01', '%Y-%m-%d')
        end = datetime.now()
        joinedAt = str(fake.date_time_between(start, end))
        f.write(','.join([str(userID), username, password, email, phone, type, joinedAt]))
        f.write('\n')
    f.close()
    return (driverIDs, passengerIDs)

def generateVehicles(driverIDs):
    driverAndVehicleIDs = []
    f = open('data/production/vehicle.txt', 'w')
    for driverID in driverIDs:
        vehicleCount = random.choices([0, 1, 2, 3, 4, 5], weights=(10, 65, 15, 7, 2, 1))[0]
        for vehicleID in range(1, vehicleCount + 1):
            model = fake.vehicle_make_model()
            capacity = random.choices([1, 4, 5, 6], weights=(5, 60, 15, 20))[0]
            f.write(','.join(([str(driverID), str(vehicleID), model, str(capacity)])))
            f.write('\n')
            driverAndVehicleIDs.append((driverID, vehicleID, capacity))
    f.close()
    return driverAndVehicleIDs

def generateTrips(vehicleInfo):
    trips = []
    hours = list(range(24))
    minutes = list(range(0, 60, 5))
    f = open('data/production/trip.txt', 'w')
    for vehicle in vehicleInfo:
        for tripID in range(1, randrange(15) + 1):
            tripInfo = (vehicle[0], vehicle[1], vehicle[2], tripID)
            trips.append(tripInfo)
            origin = fake.city()
            destination = fake.city()
            while destination == origin: destination = fake.city()
            start = datetime.strptime('2022-01-01', '%Y-%m-%d')
            end = datetime.strptime('2023-06-01', '%Y-%m-%d')
            date = str(fake.date_between(start, end))
            weights = (2, 1, 1, 1, 2, 5, 10, 15, 15, 15, 20, 20, 20, 20, 20, 20, 20, 20, 20, 15, 10, 5, 3, 2)
            hour = random.choices(hours, weights=weights)[0]
            weights = (5, 1, 2, 3, 2, 1, 5, 1, 2, 3, 2, 1)
            minute = random.choices(minutes)[0]
            departTime = date + " " + str(dt.time(hour, minute, 0))
            price = randrange(10, 150)
            description = random.choice([f'Carpool from {origin} to {destination}', 'NULL'])
            f.write(','.join([str(vehicle[0]), str(vehicle[1]), str(tripID), origin, destination, departTime, str(price), description]))
            f.write('\n')
    f.close()
    return trips

def generateTravelled(passengerIDs, trips):
    f = open('data/production/travelled.txt', 'w')
    for trip in trips:
        passengers = random.sample(passengerIDs, randrange(trip[2]))
        for passengerID in passengers:
            rating = randrange(0, 50) / 10
            rating = random.choice([str(rating), 'NULL'])
            f.write(','.join([str(trip[0]), str(trip[1]), str(trip[3]), str(passengerID), rating]))
            f.write('\n')
    f.close()

userIDs = generateUsers()
vehicleInfo = generateVehicles(userIDs[0])
tripInfo = generateTrips(vehicleInfo)
generateTravelled(userIDs[1], tripInfo)
