import mysql.connector
from sqlite3 import OperationalError
import json

def createTriggers():
    path = open('../../mysqlConfig.json')
    config = json.load(path)
    db = mysql.connector.connect(
        host=config['host'],
        user=config['user'],
        password=config['password'],
        database="WCP_DB",
    )
    cursor = db.cursor()
    triggers = [ 
         """CREATE TRIGGER insertPassenger 
            AFTER INSERT ON USER 
            FOR EACH ROW 
            BEGIN 
                IF NEW.type = 'passenger' THEN 
                    INSERT INTO Passenger (userID) VALUE (NEW.userID); 
                ELSEIF NEW.type = 'driver' THEN 
                    INSERT INTO Driver (userID) VALUE (NEW.userID); 
                END IF; 
            END;""",

         """CREATE TRIGGER deleteTrip
            BEFORE DELETE ON Trip
            FOR EACH ROW
                DELETE FROM Travelled WHERE Travelled.driverID = OLD.driverID 
                AND Travelled.vehicleID = OLD.vehicleID 
                AND Travelled.tripID = OLD.tripID;""",

         """CREATE TRIGGER updateRating
            AFTER UPDATE ON Travelled
            FOR EACH ROW
                UPDATE Driver as D
                INNER JOIN
                    (SELECT Travelled.driverID, AVG(rating) AS avgRating 
                    FROM Travelled 
                    WHERE Travelled.driverID = NEW.driverID AND Travelled.rating IS NOT NULL
                    GROUP BY Travelled.driverID) T
                    ON D.userID = T.driverID
                SET D.rating = T.avgRating;""",
                
         """CREATE TRIGGER insertRating
            AFTER INSERT ON Travelled
            FOR EACH ROW
                UPDATE Driver as D
                INNER JOIN
                    (SELECT Travelled.driverID, AVG(rating) AS avgRating 
                    FROM Travelled 
                    WHERE Travelled.driverID = NEW.driverID AND Travelled.rating IS NOT NULL
                    GROUP BY Travelled.driverID) T
                    ON D.userID = T.driverID
                SET D.rating = T.avgRating;"""
        
    ]
    for trigger in triggers:
        try:
            cursor.execute(trigger)
        except OperationalError as msg:
            print("Command skipped: ", msg)
