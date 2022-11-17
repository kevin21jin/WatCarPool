-- ###############################################################################################
-- R11: Passenger/Driver Advanced Search Trips
-- ###############################################################################################

USE WCP_DB;

-- Test Null: The registered user want to search trips with all filter fields being null
-- Expect: all entries in the Trip table should be returned

-- Check current Trip table
SELECT * FROM Trip;

-- Select all entries with the above condition
SELECT * FROM Trip;

-- Test orgin and destination: 
-- The registered user want to search trips with origin = City A, destination = null and all the other fields = null
-- Expect: Only entries that have origin = City A should be returned
SELECT * FROM Trip WHERE origin = 'City A';

-- The registered user want to search trips with origin = null, destination = City D and other fields = null
-- Expect: Only entries that have destination = City D should be returned
SELECT * FROM Trip WHERE destination = 'City D';

-- The registered user want to search trips with origin = City D, destination = City E and other fields = null
-- Expect: Only entries that have origin = City D and destination = City E should be returned
SELECT * FROM Trip WHERE origin = 'City D' AND destination = 'City E';

-- Test departTime: 
-- The registered user want to search trips with departTime <= 2022-10-20 00:00:00 
-- Expect: Only entries that have departTime <= '2022-10-20 00:00:00' should be returned
SELECT * FROM Trip WHERE departTime <= '2022-10-20 00:00:00';

-- The registered user want to search trips with departTime >= 2022-10-21 00:00:00 
-- Expect: Only entries that have departTime >= '2022-10-21 00:00:00' should be returned
SELECT * FROM Trip WHERE departTime >= '2022-10-21 00:00:00';

-- The registered user want to search trips with departTime <= 2022-10-21 00:00:00 and
-- departTime >= 2022-10-20 00:00:00 
-- Expect: Only entries that have departTime >= '2022-10-20 00:00:00' 
-- AND departTime <= '2022-10-21 19:00:00' should be returned
SELECT * FROM Trip WHERE departTime >= '2022-10-20 00:00:00' AND departTime <= '2022-10-21 19:00:00';

-- Test price:
-- The registered user want to search trips with price >= 30
-- Expect: Only entries that have price >= 30 should be returned
SELECT * FROM Trip WHERE price >= 30;

-- The registered user want to search trips with price <= 50
-- Expect: Only entries that have price <= 50 should be returned
SELECT * FROM Trip WHERE price <= 50;

-- The registered user want to search trips with price >= 0 and price <= 100
-- Expect: Only entries that have price <= 100 and price >= 0 should be returned
SELECT * FROM Trip WHERE price <= 100 AND price >= 0;

-- Test combined fields:
-- The registered user want to search trips with origin = City F, destination = City C,
-- departTime >= '2022-10-23 00:00:00', departTime <= '2022-11-15 00:00:00' and price <= 100
-- Expect: Only entries that meet the condition above should be returned 
SELECT * FROM Trip 
    WHERE origin = 'City F' AND destination = 'City C'
        AND departTime >= '2022-10-23 00:00:00' AND departTime <= '2022-11-15 00:00:00' AND price <= 100;
