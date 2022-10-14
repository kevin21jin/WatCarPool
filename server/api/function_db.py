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

def execute_getTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return result
