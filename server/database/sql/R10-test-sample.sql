USE WCP_DB
-- Test: Rate a trip of a driver who already has rating
-- Expect: the driver's rating will update after considering the new rating 
SELECT * FROM Driver;

INSERT INTO Travelled (driverID, vehicleID, tripID, passengerID, rating) 
SELECT '2', '1', '1', '5', '5.0';

SELECT * FROM Driver;
