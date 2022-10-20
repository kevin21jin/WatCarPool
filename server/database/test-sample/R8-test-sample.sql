-- ###############################################################################################
-- R8: Create/Update/Delete Trip
-- ###############################################################################################

USE WCP_DB;

-- The driver can create a trip with their registed vehicle. If a driver does
-- not have a vehicle, they must register a vehicle first before creating a trip.

-- We are going to create a new driver. By default, the driver does not have any
-- vehicles registered.
INSERT INTO User (username, password, email, phone, type, joinedAt) 
SELECT 'testdriver', '12345678', 'test@gmail.com', '0000000000', 'driver', '2022-10-20';
SELECT userID FROM User WHERE username = 'testdriver';

-- We want to check if the number of vehicles registed by the driver is not 0.

-- The drivers with id 2 and 4 both have vehicles already, so they can create trips.
SELECT count(*) FROM Vehicle WHERE driverID = 2;
SELECT count(*) FROM Vehicle WHERE driverID = 4;

-- The driver we just created do not have a registered vehicle.
SELECT count(*) FROM Vehicle WHERE driverID = 8;
-- We need to register a vehicle first for the driver.
INSERT INTO Vehicle (driverID, vehicleID, model, capacity)
SELECT 8, 1, 'Car 1', 4; 
-- The driver has a vehicle now.
SELECT count(*) FROM Vehicle WHERE driverID = 8;

-- All drivers in the database can now create new trips. When a driver creates a
-- trip with a vehicle, we need to check the number of trips created by the driver
-- with the vehicle and add 1 to it to make it the tripID. In this case, driver with
-- userID 2 has 1 vehicle and 2 trips associated to the vehicle.
SELECT count(*) FROM Trip WHERE driverID = 2 AND vehicleID = 1;

-- The previous query returns 2, so we need to set the tripID to 3.
INSERT INTO Trip (driverID, vehicleID, tripID, origin, destination, departTime, price, desciption)
SELECT 2, 1, 3, 'Waterloo', 'Toronto', '2022-10-22 10:30', 40, 'Carpool from Waterloo to Toronto';
-- Check Trip table
SELECT * FROM Trip;

-- The next trip created will have tripID equal to 4.
INSERT INTO Trip (driverID, vehicleID, tripID, origin, destination, departTime, price, desciption)
SELECT 2, 1, 4, 'Toronto', 'Waterloo', '2022-10-23 14:00', 40, 'Carpool from Toronto to Waterloo';
-- Check Trip table
SELECT * FROM Trip;

-- If a user have more than one vehicles, they can create trips with different
-- vehicles. In this case, driver with userID 4 has 2 vehicles, we can create
-- trips with either of the vehicle.

-- Both vehicles have 2 trips created by the driver, the the tripID will be 3.
SELECT count(*) FROM Trip WHERE driverID = 4 AND vehicleID = 1;
SELECT count(*) FROM Trip WHERE driverID = 4 AND vehicleID = 2;

-- Create trip with vehicleID = 1
INSERT INTO Trip (driverID, vehicleID, tripID, origin, destination, departTime, price, desciption)
SELECT 4, 1, 3, 'Waterloo', 'Toronto', '2022-10-22 10:30', 35, 'Carpool from Waterloo to Toronto';
-- Check Trip table
SELECT * FROM Trip;

-- Create trip with vehicleID = 2
INSERT INTO Trip (driverID, vehicleID, tripID, origin, destination, departTime, price, desciption)
SELECT 4, 2, 3, 'Toronto', 'Waterloo', '2022-10-23 14:00', 35, 'Carpool from Toronto to Waterloo';
-- Check Trip table
SELECT * FROM Trip;

-- The description of a trip is optional, so a driver can create a trip without
-- a description. In this case, the description will be set to NULL.

-- We use our testdriver to create a trip without a description.
INSERT INTO Trip (driverID, vehicleID, tripID, origin, destination, departTime, price)
SELECT 8, 1, 1, 'Toronto', 'Waterloo', '2022-10-23 14:00', 50;
-- Check Trip table
SELECT * FROM Trip;

-- After a driver creates a trip, they can either update the origin, destination,
-- departTime, price, and description of the trip, or delete the trip.

-- To update a trip, we just need to update each of the fields. We can update the trip
-- that we just created with testdriver to include a description
UPDATE Trip
SET origin = 'Toronto', destination = 'Waterloo', departTime = '2022-10-23 14:00', 
price = 50, desciption = 'Carpool from Toronto to Waterloo'
WHERE driverID = 8 AND vehicleID = 1 AND tripID = 1;
-- Check Trip table
SELECT * FROM Trip;

-- We can also remove the description by setting it to NULL
UPDATE Trip
SET origin = 'Waterloo', destination = 'Toronto', departTime = '2022-10-22 10:30', 
price = 40, desciption = NULL
WHERE driverID = 2 AND vehicleID = 1 AND tripID = 3;
-- Check Trip table
SELECT * FROM Trip;

-- We can also update other fields such as origin, destination, departTime, and price.
UPDATE Trip
SET origin = 'Mississauga', destination = 'Waterloo', departTime = '2022-10-24 8:30', 
price = 25, desciption = 'Carpool from Mississauga to Waterloo'
WHERE driverID = 4 AND vehicleID = 2 AND tripID = 3;
-- Check Trip table
SELECT * FROM Trip;

-- To delete a trip, we also need to delete the records in Travelled corresponding to
-- it because the trip is no longer available for passengers to join, and any passengers
-- that are previouly joined should be removed. We have created a trigger for the process
-- called deleteTrip, which automatically deletes the asoociated records in Travelled for
-- each deletion in Trip.
SHOW TRIGGERS WHERE `Table`='Trip'\G

-- Trip and Travelled before deletion
SELECT * FROM Trip;
SELECT * FROM Travelled;

-- Delete a trip
DELETE FROM Trip WHERE driverID = 4 AND vehicleID = 2 AND tripID = 1;

-- Trip and Travelled after deletion
SELECT * FROM Trip;
SELECT * FROM Travelled;

-- IF there is no record corresponding to a trip, then no records in Travelled
-- will be deleted after the deleletion of the trip.

-- Trip and Travelled before deletion
SELECT * FROM Trip;
SELECT * FROM Travelled;

-- Delete a trip
DELETE FROM Trip WHERE driverID = 8 AND vehicleID = 1 AND tripID = 1;

-- Trip and Travelled after deletion
SELECT * FROM Trip;
SELECT * FROM Travelled;
