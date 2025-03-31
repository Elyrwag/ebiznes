#!/bin/bash

Success_=0
Fail_=0

Success=0
Fail=0

address="http://localhost:9000"
echo "Connecting to website..."
echo
curl -s -o /dev/null -w "%{http_code}" "$address" | grep -q "200" || { echo "Server is down!"; exit 1; }

test_files=("test_product_controller.sh" "test_category_controller.sh" "test_cart_controller.sh")
for test_file in "${test_files[@]}"; do
    source ./test/$test_file $address
    Success_=$((Success_ + Success))
    Fail_=$((Fail_ + Fail))
    Success=0
    Fail=0
    echo
done

echo
echo "SUMMARY"
echo "============================"
echo "Tests succeeded: $Success_"
echo "Tests failed: $Fail_"
