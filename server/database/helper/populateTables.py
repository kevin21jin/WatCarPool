import mysql.connector

def populateTables():
    db = mysql.connector.connect(
        host="localhost",
        user="root",
        passwd="12345678",
        database="WCP_DB",
    )
    tablenames = ['user', 'passenger', 'driver', 'vehicle', 'trip', 'travelled']
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
