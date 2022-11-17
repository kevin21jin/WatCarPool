import mysql.connector
from werkzeug.security import check_password_hash, generate_password_hash
from datetime import datetime
from sqlite3 import OperationalError
from api.helper.model import User
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="12345678",
    database="WCP_DB",
)   

cursor = db.cursor()

def find_user_by_username(username):
    sql_command = "SELECT * FROM User WHERE username = %s"
    val = (username,)
    cursor.execute(sql_command, val)
    get_account = cursor.fetchall()
    if len(get_account) == 0: return None
    account = get_account[0]
    existingUser = User(account)
    return existingUser

def find_user_by_email(email):
    sql_command = "SELECT * FROM User WHERE email = %s"
    val = (email,)
    cursor.execute(sql_command, val)
    get_account = cursor.fetchall()
    if len(get_account) == 0: return None
    account = get_account[0]
    existingUser = User(account)
    return existingUser

def execute_register(username, password, email, phone, type):

    if username == None: return { "status": "Fail", "errorMessage": "ERROR: Username cannot be empty" }
    if password == None: return { "status": "Fail", "errorMessage": "ERROR: Password cannot be empty" }
    if email == None: return { "status": "Fail", "errorMessage": "ERROR: Email cannot be empty" }
    if phone == None: return { "status": "Fail", "errorMessage": "ERROR: Phone cannot be empty" }
    if type == None: return { "status": "Fail", "errorMessage": "ERROR: Account type cannot be empty" }

    if len(username) > 25:
        return { "status": "Fail", "errorMessage": "ERROR: Account username can not be longer than 25 characters" }
    
    exitUser = find_user_by_username(username)

    if exitUser != None: return { "status": "Fail", "errorMessage": "ERROR: Account with associated username already exists" }

    exitUser = find_user_by_email(email)
    if exitUser != None: return { "status": "Fail", "errorMessage": "ERROR: Account with associated email already exists" }

    try:
        sql_command = "INSERT INTO User (username, password, email, phone, type, joinedAt) VALUES (%s, %s, %s, %s, %s, %s)"
        hashed_password = generate_password_hash(password)
        val = (username, hashed_password, email, phone, type, datetime.now())
        cursor.execute(sql_command, val)
        db.commit()
    except OperationalError as msg:
        print("Command skipped: ", msg)

    return { "status": "Success" }

def execute_login(username, password):
    
    if username == None or username == "": 
        return { "status": "Fail", "errorMessage": "ERROR: Username cannot be empty" }
    if password == None or password == "": 
        return { "status": "Fail", "errorMessage": "ERROR: Password cannot be empty" }

    currentUser = find_user_by_username(username)
    if currentUser == None: return { "status": "Fail", "errorMessage": "ERROR: Account with associated username does not exist" }

    currentUserJson = json.loads(json.dumps(currentUser.__dict__, default=str))

    if not check_password_hash(currentUserJson['hashed_password'], password):
        return { "status": "Fail", "errorMessage": "ERROR: Authentication failed" }
    
    return {
        "status": "Success",
        "userType": currentUserJson['type'],
        "user": currentUserJson
    }
