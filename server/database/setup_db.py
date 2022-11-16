import mysql.connector
from helper.executeSQL import executeSQLFromFile
from helper.createTriggers import createTriggers
from helper.populateTables import populateTables
import json
import sys

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
    print('Database schema created successfully!')

print('We will create the database WCP_DB:')
createDB()
executeSQLFromFile('createtables')
createTriggers()
option = sys.argv[1]
print(f'We will import the {option} data:')
populateTables(option)
