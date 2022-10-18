import mysql.connector
from helper.executeSQL import executeSQLFromFile
import json

path = open('../../mysqlConfig.json')
config = json.load(path)
db = mysql.connector.connect(
    host=config['host'],
    user=config['user'],
    password=config['password'],
)

def createDB():
    cursor = db.cursor()
    databases = ("SHOW DATABASES")
    cursor.execute(databases)
    for (databases) in cursor:
        if databases[0] == 'WCP_DB': return
    cursor.execute("CREATE DATABASE WCP_DB")

createDB()
executeSQLFromFile('createtables')
