import mysql.connector
from sqlite3 import OperationalError

def executeSQLFromFile(filename):
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="12345678",
        database="WCP_DB",
    )
    cursor = db.cursor()
    path = f'sql/{filename}.sql'
    fd = open(path, 'r')
    sqlFile = fd.read()
    fd.close()
    sqlCommands = sqlFile.split(';')
    for command in sqlCommands:
        try:
            cursor.execute(command)
        except OperationalError as msg:
            print("Command skipped: ", msg)
