

CREATE TABLE IF NOT EXISTS User (
    userId INTEGER NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(60),
    phone VARCHAR(60),
    type VARCHAR(100) NOT NULL,
    joinedAt DATE NOT NULL
);


CREATE TABLE IF NOT EXISTS Passenger (
    
)
