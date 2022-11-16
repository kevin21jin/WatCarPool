#!/bin/bash
usage () {
    echo "Invalid command line arguments!"
    echo "Please run createdb.sh in the correct format:"
    echo ""
    echo "  1. bash createdb.sh"
    echo "     - Create the database and import the sample data into the database."
    echo ""
    echo "  2. bash createdb.sh sample"
    echo "     - Create the database and import the sample data into the database."
    echo ""
    echo "  3. bash createdb.sh production"
    echo "     - Create the database and import the production data into the database."
    exit 1
}

(
    set -e
    cd server/database
    option="sample"
    if [ $# -gt 0 ]; then
        option=$1
    fi
    if [ $# -gt 1 ]; then
        usage
    fi
    if [ $option != "sample" ] && [ $option != "production" ]; then
        usage
    fi
    python3 -B setup_db.py $option
    echo "Success!"
)