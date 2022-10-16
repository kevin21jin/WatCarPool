from xml.dom import ValidationErr
import mysql.connector
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
from sqlite3 import OperationalError

mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="12345678",
        database="WCP_DB",
)   

my_cursor = mydb.cursor()

class User():
    def __init__(self, userId, username, password, email, phone, is_driver, joined_at):
        self.userId = userId
        self.username = username
        self.hashed_password = password
        self.email = email
        self.phone = phone
        self.is_driver = is_driver
        self.joined_at = joined_at


def find_user_by_username(username):
    sql_command = "SELECT * FROM User WHERE username = %s"
    val = (username,)
    my_cursor.execute(sql_command, val)
    get_account = my_cursor.fetchall()
    if len(get_account) == 0: return None
    account = get_account[0]
    existingUser = User(account[0], account[1], account[2], account[3], account[4], account[5], account[6])
    return existingUser

def find_user_by_email(email):
    sql_command = "SELECT * FROM User WHERE email = %s"
    val = (email,)
    my_cursor.execute(sql_command, val)
    get_account = my_cursor.fetchall()
    if len(get_account) == 0: return None
    account = get_account[0]
    existingUser = User(account[0], account[1], account[2], account[3], account[4], account[5], account[6])
    return existingUser

# print(find_user_by_username("BigBruce").username)


def execute_register(username, password, email, phone, isDriver):

    if username == None: return ValidationErr('ERROR: Username cannot be empty')
    if password == None: return ValidationErr('ERROR: Password cannot be empty')
    if email == None: return ValidationErr('ERROR: Email cannot be empty')
    if phone == None: return ValidationErr('ERROR: Phone cannot be empty')
    if isDriver == None: return ValidationErr('ERROR: Account type cannot be empty')

    if len(username) > 25:
        return ValidationErr('ERROR: Account username can not be longer than 25 characters')
    
    exitUser = find_user_by_username(username)

    if exitUser != None: return ValidationErr('ERROR: Account with associated username already exists')

    exitUser = find_user_by_email(email)
    if exitUser != None: return ValidationErr('ERROR: Account with associated email already exists')

    try:
        sql_command = "INSERT INTO User (username, password, email, phone, isDriver, joinedAt) VALUES (%s, %s, %s, %s, %s, %s)"
        hashed_password = generate_password_hash(password)
        val = (username, hashed_password, email, phone, isDriver, datetime.now())
        my_cursor.execute(sql_command, val)
        mydb.commit()
    except OperationalError as msg:
            print("Command skipped: ", msg)

    return "Success"
    

def execute_login(username, password):
    
    if username == None: return ValidationErr('ERROR: Username cannot be empty')
    if password == None: return ValidationErr('ERROR: Password cannot be empty')

    currentUser = find_user_by_username(username)
    if currentUser == None: return ValidationErr('ERROR: Account with associated username does not already exist')

    if not check_password_hash(currentUser.hashed_password, password):
        return ValidationErr('ERROR: Authentication failed')
    
    return "Success: "


# def execute_getTrips(userID):
#     # TO DO
#     # result = my_cursor.execute(some sql)
#     return 0
# drive functions

def execute_driverGetOwnTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0

def execute_driverGetOtherTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0

def execute_driverCreateTrip(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0

# passenger functions

def execute_passengerGetTrips(userID):
    # TO DO
    # result = my_cursor.execute(some sql)
    return 0
