#!/bin/bash
usage () {
    echo "Invalid command line arguments!"
    echo "Please run updatedb.sh in the correct format:"
    echo ""
    echo "  1. bash updatedb.sh"
    echo "     - Update the database by importing the sample data."
    echo ""
    echo "  2. bash updatedb.sh sample"
    echo "     - Update the database by importing the sample data."
    echo ""
    echo "  3. bash updatedb.sh production"
    echo "     - Update the database by importing the production data."
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
    python3 -B update_db.py $option
    echo "Success!"
)
