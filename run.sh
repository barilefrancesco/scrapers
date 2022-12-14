#!/bin/bash
python3.9 -m venv venv
source ./venv/Scripts/activate
source venv/bin/activate

./venv/Scripts/pip install -r requirements.txt
./venv/bin/pip install -r requirements.txt

gnome-terminal -- sh -c "
    source venv/bin/activate
    cd whatsapp
    python3.9 app.py; bash"
start cmd /k "cd whatsapp && python3.9 app.py"

gnome-terminal -- sh -c "
    source venv/bin/activate
    cd telegram
    python3.9 app.py; bash"
start cmd /k "cd telegram && python3.9 app.py"

gnome-terminal -- sh -c "
    cd dashboard && npm run start
    status=$?
    echo $status
    if [ $status -ne 0 ]; then
        cd dashboard
        npm ci
        npm run build
        gnome-terminal -- sh -c \"npm run start; bash\"
    fi
;bash"

start cmd /k "
    cd dashboard && npm run start
    status=$?
    echo $status
    if [ $status -ne 0 ]; then
        cd dashboard
        npm ci
        npm run build
        start cmd /k \"npm run start\"
    fi    
    "

nohup open http://localhost:3000
explorer "http://localhost:3000"

sleep 1
kill -9 $PPID