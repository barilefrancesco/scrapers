
#!/bin/bash

python -m venv venv

source venv/bin/activate

./venv/Scripts/pip install -r requirements.txt
./venv/bin/pip install -r requirements.txt

gnome-terminal -- sh -c "cd whatsapp && python app.py; bash"
START "./scripts/whatsapp.sh"

gnome-terminal -- sh -c "cd telegram && python app.py; bash"
start cmd /k "cd telegram && python app.py"
START "./scripts/telegram.sh"

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

START "./scripts/dashboard.sh"

nohup open http://localhost:3000
explorer "http://localhost:3000"


sleep 2
kill -9 $PPID