-- ###############################################################################################
-- R7: Register Vehicle
-- ###############################################################################################

USE WCP_DB;

-- When a driver registers a new vehicle, we need to first check the number of
-- vehicles already registered by that driver and add 1 to it to make it the
-- vehicleID.
SELECT count(*) FROM Vehicle WHERE driverID = 2;

-- The previous query returns 1, so we need to set the vehicleID to 2
INSERT INTO Vehicle (driverID, vehicleID, model, capacity)
SELECT 2, 2, 'New Car', 6; 
-- Check Vehicle table
SELECT * FROM Vehicle;
