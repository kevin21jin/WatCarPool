
from importlib.resources import path
import mysql.connector
from sqlite3 import OperationalError, dbapi2
import sqlalchemy


# mydb = mysql.connector.connect(
#     host="localhost",
#     user="root",
#     passwd="12345678",
# )

# my_cursor = mydb.cursor()

def executeScriptsFromFile(filename):
    # db = sqlalchemy.create_engine("mysql://root:12345678@localhost/WCP_DB")

    mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="12345678",
        database="WCP_DB",
    )   

    my_cursor = mydb.cursor()


    # Open and read the file
    path_to_file = f'../sql/{filename}.sql'
    fd = open(path_to_file, 'r')
    sqlFile = fd.read()
    fd.close()

    # all SQL commands (split on ';')
    sqlCommands = sqlFile.split(';')
    for command in sqlCommands:
        try:
            my_cursor.execute(command)
        except OperationalError as msg:
            print("Command skipped: ", msg)

executeScriptsFromFile('createtables')
