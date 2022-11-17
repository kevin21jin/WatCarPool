-- ###############################################################################################
-- R6: User Registration/Login
-- ###############################################################################################

USE WCP_DB;

-- The user cannot register if either of the username, email address, or
-- phone number is already used by another user.
-- We will check if the count returns 0, if so, then the user can register
-- successfully. Otherwise, we will produce an error message indicating that
-- the username/email/phone is already in use.

-- User table before registering a user
SELECT * FROM User;

-- Record already exists, cannot register
SELECT COUNT(*) FROM User WHERE username = 'Bonnie Dawson'; 

-- Record does not exist, can register 
SELECT COUNT(*) FROM User WHERE username = 'testpassenger'; 

-- Record already exists, cannot register
SELECT COUNT(*) FROM User WHERE email = 'jennifergraham@gmail.com'; 

-- Record does not exist, can register
SELECT COUNT(*) FROM User WHERE email = '8@gmail.com'; 

-- Record already exists, cannot register
SELECT COUNT(*) FROM User WHERE phone = '173.388.8273'; 

-- Record does not exist, can register
SELECT COUNT(*) FROM User WHERE phone = '9999999999'; 

-- The user can either register as a passenger or driver. After registration, a new
-- record will be created in either Passenger or Driver table that matches the user.

-- Passenger and Driver tables before registering a user
SELECT * FROM Passenger;
SELECT * FROM Driver;

-- Register as a passenger
INSERT INTO User (username, password, email, phone, type, joinedAt) 
SELECT 'testpassenger', '12345678', '8@gmail.com', '8888888888', 'passenger', '2022-10-20';
-- Check User and Passenger tables after registration
SELECT * FROM User;
SELECT * FROM Passenger;

-- Register as a driver, by default, the driver does not have any rating so the
-- rating is set to NULL
INSERT INTO User (username, password, email, phone, type, joinedAt) 
SELECT 'testdriver', '12345678', '9@gmail.com', '9999999999', 'driver', '2022-10-20';
-- Check User and Driver tables after registration
SELECT * FROM User;
SELECT * FROM Driver;

-- To login, the username and password must match what is stored in the database.
-- If the credentials match, then the user can login successfully. We can achieve
-- this by selecting record from the database with username and password. If the 
-- query returns a record, then the user can login. If the query returns an empty
-- set, we will indicate that the username or password is incorrect.

-- Login with correct credentials
SELECT * FROM User WHERE username = 'testpassenger' AND password = '12345678';

-- Login with incorrect username
SELECT * FROM User WHERE username = 'incorrect' AND password = '12345678';

-- Login with incorrect password
SELECT * FROM User WHERE username = 'testdriver' AND password = 'incorrect';
