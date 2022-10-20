#!/bin/bash
(
    set -e
    echo "We will be resetting up the sample databse now!"
    cd ../
    echo "We will reset the database WCP_DB:"
    python3 -B update_db.py
    echo "Success!"
)