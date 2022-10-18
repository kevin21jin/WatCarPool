from dataclasses import dataclass
import mysql.connector
import os

def populateTables():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="12345678",
        database="WCP_DB",
    )
    datafiles = os.listdir('data')
    for filename in datafiles:
        if filename.endswith('.txt'): populateTableByFilename(db, filename)

def populateTableByFilename(db, filename):
    cursor = db.cursor()
    path = f'data/{filename}'
    tablename = filename[:-4]
    fd = open(path, 'r')
    for line in fd:
        data = line.split(',')
        values = ('%s,' * len(data))[:-1]
        command = 'INSERT INTO ' + tablename + ' VALUES (' + values +')'
        cursor.execute(command, data)
    fd.close()
    db.commit()
