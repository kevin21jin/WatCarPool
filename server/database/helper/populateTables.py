import mysql.connector
import json

def populateTables(option):
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
        populateTableByFilename(db, tablename, option)

def populateTableByFilename(db, tablename, option):
    cursor = db.cursor()
    path = f'data/{option}/{tablename}.txt'
    fd = open(path, 'r')
    for line in fd:
        line = line.replace('\n', '')
        data = [None if val == 'NULL' else val for val in line.split(',')]
        values = ('%s,' * len(data))[:-1]
        command = 'INSERT INTO ' + tablename + ' VALUES (' + values +')'
        cursor.execute(command, data)
    fd.close()
    db.commit()
    print(tablename.capitalize() + ' table populated successfully!')
