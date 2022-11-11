#!/bin/bash
(
    set -e
    echo "Let me run the server:"
    cd server
    source env/bin/activate
    python3 -B server.py
)