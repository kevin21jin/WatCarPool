-- R1: User Registration/Login

-- The user cannot register if either of the username, email address, or
-- phone number is already used by another user.
-- We will check if the count returns 0, if so, then the user can register
-- successfully. Otherwise, we will produce an error message indicating that
-- the username/email/phone is already in use.
SELECT COUNT(*) FROM User WHERE username = 'passenger1';
SELECT COUNT(*) FROM User WHERE username = 'passenger6';
SELECT COUNT(*) FROM User WHERE email = '2@gmail.com';
SELECT COUNT(*) FROM User WHERE email = '9@gmail.com';
SELECT COUNT(*) FROM User WHERE phone = '3333333333';
SELECT COUNT(*) FROM User WHERE phone = '9999999999';

-- The user can either register as a passenger or driver
INSERT INTO User (username, password, email, phone, type, joinedAt) 
SELECT 'passenger6', '12345678', '8@gmail.com', '8888888888', 'passenger', '2022-10-20';

INSERT INTO User (username, password, email, phone, type, joinedAt) 
SELECT 'driver3', '12345678', '9@gmail.com', '9999999999', 'driver', '2022-10-20';

-- To login, the username and password must match what is stored in the database.

-- R2: Register Vehicle 

-- R3: Create/Update/Delete Trip

-- R4: Join/Leave Trip

-- R5: Rate Trip