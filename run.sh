#!/bin/bash
python3.9 -m venv venv
source ./venv/Scripts/activate
source venv/bin/activate

./venv/Scripts/pip install -r requirements.txt
./venv/bin/pip install -r requirements.txt

gnome-terminal -- sh -c "python3.9 whatsapp/app.py; bash"
gnome-terminal -- sh -c "python3.9 telegram/app.py; bash"

cd dashboard
gnome-terminal -- sh -c "npm run start; bash"

status=$?
if [ $status -ne 0 ]; then
    npm ci
    npm run build
    gnome-terminal -- sh -c "npm run start; bash"
fi

nohup open http://localhost:3000
sleep 2
echo "Press [CTRL+C] to stop.."
kill -9 $PPID