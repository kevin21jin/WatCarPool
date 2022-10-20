import mysql.connector
import json

def populateTables():
    path = open('../../mysqlConfig.json')
    config = json.load(path)
    db = mysql.connector.connect(
        host=config['host'],
        user=config['user'],
        password=config['password'],
        database="WCP_DB",
    )
    tablenames = ['user', 'vehicle', 'trip', 'travelled']
    for tablename in tablenames:
        populateTableByFilename(db, tablename)

def populateTableByFilename(db, tablename):
    cursor = db.cursor()
    path = f'data/{tablename}.txt'
    fd = open(path, 'r')
    for line in fd:
        data = line.split(',')
        values = ('%s,' * len(data))[:-1]
        command = 'INSERT INTO ' + tablename + ' VALUES (' + values +')'
        cursor.execute(command, data)
    fd.close()
    db.commit()
