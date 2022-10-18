#!/bin/bash
(
    set -e
    echo "Welcome to WatCarPool:"
    echo "Let me pull the latest git repo"
    git pull

    echo "Let me setup the frontend server:"
    cd client/my-app
    npm install
    cd ../..

    echo "Let me setup the backtend server:"
    cd server
    pip3 install -r pipinstall.txt

    echo "Setup successful!"
)
