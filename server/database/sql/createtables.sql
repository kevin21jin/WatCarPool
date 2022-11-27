CREATE TABLE IF NOT EXISTS User
(
    userID INT(11) NOT NULL AUTO_INCREMENT,
    username VARCHAR(25) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(60) NOT NULL,
    phone VARCHAR(60) NOT NULL,
    type VARCHAR(9) NOT NULL,
    joinedAt DATETIME NOT NULL,
    PRIMARY KEY (userID)
);

CREATE TABLE IF NOT EXISTS Passenger
(
    userID INT(11) NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(userID),
    PRIMARY KEY (userID)
);

CREATE TABLE IF NOT EXISTS Driver
(
    userID INT(11) NOT NULL,
    rating DECIMAL(3,2),
    FOREIGN KEY (userID) REFERENCES User(userID),
    PRIMARY KEY (userID)
);

CREATE TABLE IF NOT EXISTS Vehicle
(
    driverID INT(11) NOT NULL,
    vehicleID INT(11) NOT NULL,
    model VARCHAR(100) NOT NULL,
    capacity INT(2) NOT NULL,
    FOREIGN KEY (driverID) REFERENCES Driver(userID),
    PRIMARY KEY (driverID, vehicleID)
);

CREATE TABLE IF NOT EXISTS Trip
(
    driverID INT(11) NOT NULL,
    vehicleID INT(11) NOT NULL,
    tripID INT(11) NOT NULL,
    origin VARCHAR(25) NOT NULL,
    destination VARCHAR(25) NOT NULL,
    departTime DATETIME NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    description VARCHAR(1000),
    FOREIGN KEY (driverID, vehicleID) REFERENCES Vehicle(driverID, vehicleID),
    PRIMARY KEY (driverID, vehicleID, tripID)
);

CREATE TABLE IF NOT EXISTS Travelled
(
    driverID INT(11) NOT NULL,
    vehicleID INT(11) NOT NULL,
    tripID INT(11) NOT NULL,
    passengerID INT(11) NOT NULL,
    rating DECIMAL(2,1),
    FOREIGN KEY (driverID, vehicleID, tripID) REFERENCES Trip(driverID, vehicleID, tripID),
    FOREIGN KEY (passengerID) REFERENCES Passenger(userID), 
    PRIMARY KEY (driverID, vehicleID, tripID, passengerID)
);