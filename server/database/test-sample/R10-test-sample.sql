-- ###############################################################################################
-- R10: Rate Trip
-- ###############################################################################################

USE WCP_DB

-- Test: Rate a trip of a driver who already has rating
-- Expect: the driver's rating will update after considering the new rating 

-- check current Driver table
SELECT * FROM Driver;

-- submitting a new rating for a traveled
INSERT INTO Travelled (driverID, vehicleID, tripID, passengerID, rating) 
SELECT '2', '1', '1', '5', '5.0';

-- check Driver table after inserting a rating
SELECT * FROM Driver;