-- ###############################################################################################
-- R9: Join/Leave Trip
-- ###############################################################################################

USE WCP_DB

-- Test: A passenger want to join a trip
-- Expect: the travelled table add a tuple representing this trip (since the passenger would
-- not have rate this trip, the rating would be NULL)

-- Check current table
SELECT * FROM Travelled;

-- Insert new travelled
INSERT INTO Travelled (driverID, vehicleID, tripID, passengerID, rating) 
SELECT '2', '1', '1', '5', NULL;

-- Check table after inserting the new travelled
SELECT * FROM Travelled;

-- Test: A passenger want to leave a trip
-- Expect: the travelled table deletes tuple representing this trip

-- Remove a existing travelled
DELETE FROM Travelled
WHERE passengerID = '5' AND driverID = '2' AND vehicleID = '1' AND tripID = '1';

-- Check the table after deleting a travelled
SELECT * FROM Travelled;

-- Test: A passenger want to leave a trip, but the trip capacity is full, the backend server need to know 
--       whether the trip is full before proceeding the database query.
-- Expect: the vehicle table return the max capacity for the corresponding vehicle use in the trip, in
--         this test, assume the passenge with passengeID = 7 wants to join a trip with driverID = 4, 
--         vehicleID = 2, tripID = 1. the database will reture the max capacity and currenty capacity to the server.

-- Maximum capacity
SELECT capacity FROM Vehicle
WHERE driverID = '4' AND vehicleID = '2';

-- Current capacity capacity
SELECT COUNT(*) FROM Travelled
WHERE driverID = '4' AND vehicleID = '2' AND tripID = '1'
