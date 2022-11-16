from helper.executeSQL import executeSQLFromFile
from helper.populateTables import populateTables
from helper.createTriggers import createTriggers
import sys

print('We will update the database WCP_DB:')
executeSQLFromFile('droptables')
executeSQLFromFile('createtables')
createTriggers()
option = sys.argv[1]
print(f'We will import the {option} data:')
populateTables(option)
