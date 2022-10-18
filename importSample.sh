#!/bin/bash
(
    set -e
    echo "We will be importing sample databse now!"
    echo "We will create the database WCP_DB:"
    cd server/database
    python3 -B setup_db.py
    echo "Success!"
    echo "We will update the database WCP_DB:"
    python3 -B update_db.py
    echo "Success!"
)

