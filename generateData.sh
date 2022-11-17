#!/bin/bash
(
    set -e
    echo "We will generate some new production data:"
    cd server/database
    python3 -B helper/generateProductionData.py 
    echo "Success!"
)