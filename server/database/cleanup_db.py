import mysql.connector
import json

path = open('../../mysqlConfig.json')
config = json.load(path)
db = mysql.connector.connect(
    host=config['host'],
    user=config['user'],
    password=config['password']
)

cursor = db.cursor()
cursor.execute('DROP DATABASE WCP_DB')
