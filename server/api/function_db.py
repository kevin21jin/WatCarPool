import mysql.connector


mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="12345678",
        database="WCP_DB",
    )   

my_cursor = mydb.cursor()

def execute_register(username, password, email, phone, type):
    # TO DO
    # result = my_cursor.execute(some sql)
    return result

def execute_login(username, password):
    # TO DO
    # result = my_cursor.execute(some sql)
    return result

# drive functions

def execute_driverGetOwnTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return result

def execute_driverGetOtherTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return result

def execute_driverCreateTrip(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return result

# passenger functions

def execute_passengerGetTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return result
