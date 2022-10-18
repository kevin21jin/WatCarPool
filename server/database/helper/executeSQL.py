import mysql.connector
from sqlite3 import OperationalError
import json

def executeSQLFromFile(filename):
    path = open('../../mysqlConfig.json')
    config = json.load(path)
    db = mysql.connector.connect(
        host=config['host'],
        user=config['user'],
        password=config['password'],
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
