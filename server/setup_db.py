import mysql.connector
from database.executeSQL import executeScriptsFromFile

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345678",
)

def createDB():
    cursor = db.cursor()
    databases = ("SHOW DATABASES")
    cursor.execute(databases)
    for (databases) in cursor:
        if databases[0] == 'WCP_DB': return
    cursor.execute("CREATE DATABASE WCP_DB")

createDB()
executeScriptsFromFile('createtables')
# executeScriptsFromFile('populatetables')
#executeScriptsFromFile('droptables')
