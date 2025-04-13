#!/bin/bash

Success_=0
Fail_=0

Success=0
Fail=0

create_new_db() {
  rm -f "data.db"
  go run migrate.go
}

prepare_test_env() {
    echo "Preparing test environment..."
    test_data_location="./tests/test_data.sql"
    database_location="data.db"

    if [ ! -f $test_data_location ]; then
        sleep 1
        echo "File test_data.sql doesn't exists. Aborting..."
        exit 1
    fi

    echo "Deleting old database and creating new one..."
    create_new_db
    if [ ! -f $database_location ]; then
        sleep 1
        echo "Database doesn't exists. Aborting..."
        exit 1
    fi
    sqlite3 $database_location < $test_data_location

    sleep 1
    echo "Old database deleted. Created new database with test data"
}

read -p "This test needs the server to be shut down. It also DELETES database and creates a new one - want to continue? (y/n) " answer
if [[ "$answer" == "y" ]]; then

    if lsof -i :8080 >/dev/null; then
        echo "Port 8080 is already in use. Make sure that server is down"
        exit 1
    fi

    prepare_test_env
    go run main.go > /dev/null 2>&1 &

    sleep 3

    address_="http://localhost:8080"
    echo "Connecting to website..."
    echo
    curl -s -o /dev/null -w "%{http_code}" "$address_" | grep -q "200" || { echo "Server is down!"; exit 1; }

    test_files=("test_product_controller.sh" "test_cart_controller.sh")
    for test_file in "${test_files[@]}"; do
        source ./tests/$test_file $address_
        Success_=$((Success_ + Success))
        Fail_=$((Fail_ + Fail))
        Success=0
        Fail=0
        echo
    done

    kill -9 $(lsof -t -i :8080)

    echo
    echo "SUMMARY"
    echo "============================"
    echo "Tests succeeded: $Success_"
    echo "Tests failed: $Fail_"

    read -p "Do you want to clear database - DELETE and create empty database? (y/n) " answer
    if [[ "$answer" == "y" ]]; then
        create_new_db
    fi
fi
