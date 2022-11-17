-- ###############################################################################################
-- R7: Register Vehicle
-- ###############################################################################################

USE WCP_DB;
SELECT * FROM Vehicle;
-- When a driver registers a new vehicle, we need to first check the number of
-- vehicles already registered by that driver and add 1 to it to make it the
-- vehicleID.
SELECT count(*) FROM Vehicle WHERE driverID = 4;

-- The previous query returns 5, so we need to set the vehicleID to 6
INSERT INTO Vehicle (driverID, vehicleID, model, capacity)
SELECT 4, 6, 'New Car', 3; 
-- Check Vehicle table
-- a new car is created for driver with driverID 4 
SELECT * FROM Vehicle;
