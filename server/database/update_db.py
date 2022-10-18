from helper.executeSQL import executeSQLFromFile
from helper.populateTables import populateTables

executeSQLFromFile('droptables')
executeSQLFromFile('createtables')
populateTables()
