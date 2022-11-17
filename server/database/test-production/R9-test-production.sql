-- ###############################################################################################
-- R9: Join/Leave Trip
-- ###############################################################################################

USE WCP_DB;

-- Test: A passenger want to join a trip
-- Expect: the travelled table add a tuple representing this trip (since the passenger would
-- not have rate this trip, the rating would be NULL)

-- Check current table
SELECT * FROM Travelled LIMIT 10;

-- Passenger 5 want to join driver 1's vehicle 1's trip 1 
-- Insert new travelled for the t
INSERT INTO Travelled (driverID, vehicleID, tripID, passengerID, rating) 
SELECT '1', '1', '8', '5', NULL;

-- Check table after inserting the new travelled
SELECT * FROM Travelled WHERE driverID = 1 AND vehicleID = 1 AND tripID = 8 AND passengerID = 5;

-- Test: A passenger want to leave a trip
-- Expect: the travelled table deletes tuple representing this trip

-- Passenger 5 decide to quit driver 1's vehicle 1's trip 1 
-- Remove a existing travelled
DELETE FROM Travelled
WHERE passengerID = '5' AND driverID = '1' AND vehicleID = '1' AND tripID = '8';

-- Check the table after deleting a travelled
SELECT count(*) FROM Travelled WHERE driverID = 1 AND vehicleID = 1 AND tripID = 8 AND passengerID = 5;

-- Test: A passenger want to join a trip, but the trip capacity is full, the backend server need to know 
--       whether the trip is full before proceeding the database query.
-- Expect: the vehicle table returns the max capacity for the corresponding vehicle use in the trip, in
--         this test, assume the passenge with passengeID = 7 wants to join a trip with driverID = 4, 
--         vehicleID = 2, tripID = 1. The database will return the max capacity and current capacity to the server.

-- Maximum capacity
SELECT capacity FROM Vehicle
WHERE driverID = '4' AND vehicleID = '2';

-- Current capacity
SELECT COUNT(*) FROM Travelled
WHERE driverID = '4' AND vehicleID = '2' AND tripID = '1'
