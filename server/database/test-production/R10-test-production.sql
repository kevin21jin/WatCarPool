-- ###############################################################################################
-- R10: Rate Trip
-- ###############################################################################################

USE WCP_DB;

-- Test: Rate a trip of a driver who already has rating
-- Expect: the driver's rating will update after considering the new rating 

-- check current Driver table
SELECT * FROM Driver;

-- submitting a new rating for a traveled
UPDATE Travelled SET rating = "5.0" WHERE driverID = "1" AND vehicleID = "1" AND tripID = "1" AND passengerID = "896";

-- check Driver table after inserting a rating
SELECT * FROM Driver;