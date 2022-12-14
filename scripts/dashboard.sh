cd dashboard
npm run start
status=$?
echo $status
    if [ $status -ne 0 ]; then
        cd dashboard
        npm ci
        npm run build
        npm run start
    fi