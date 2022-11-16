#!/bin/bash
(
    set -e
    echo "We will drop the database WCP_DB:"
    cd server/database
    python3 -B cleanup_db.py
    echo "Success!"
)