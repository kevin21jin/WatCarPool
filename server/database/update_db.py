from helper.executeSQL import executeSQLFromFile
from helper.populateTables import populateTables
from helper.createTriggers import createTriggers

executeSQLFromFile('droptables')
executeSQLFromFile('createtables')
createTriggers()
populateTables()
