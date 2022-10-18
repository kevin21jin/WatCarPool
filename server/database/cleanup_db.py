import mysql.connector

db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345678",
)

cursor = db.cursor()
cursor.execute('DROP DATABASE WCP_DB')
