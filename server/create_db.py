import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345678",
)

my_cursor = mydb.cursor()

# Create Database
my_cursor.execute("CREATE DATABASE WCP_DB")
# my_cursor.execute("CREATE TABLE()")
# my_cursor.execute("INSERT INTO")

my_cursor.execute("SHOW DATABASES")
for db in my_cursor:
    print(db)
