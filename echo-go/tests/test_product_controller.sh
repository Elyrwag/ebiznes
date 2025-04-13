#!/bin/bash

Success=0
Fail=0

compare_response() {
  response=$1
  expected=$2

  if [[ "$response" == "$expected" ]]; then
    echo "Success"
    Success=$((Success + 1))
  else
    echo "Fail"
    Fail=$((Fail + 1))
  fi
}

address="$1/product"
contentType="Content-Type: application/json"
w_flag="%{http_code}"

echo "TESTING PRODUCT CONTROLLER"
echo "============================"
echo

# GET allProducts
expected="200"
response=$(curl -s -X GET "$address" -H "$contentType" -w "$w_flag" -o /dev/null)
printf "Testing get allProducts... "
sleep 1
compare_response "$response" "$expected"

# POST Product (add)
newProduct='{"name":"New Product","categoryID":2,"price":250.5}'
expected="201"
response=$(curl -s -X POST "$address" -H "$contentType" -w "$w_flag" -o /dev/null -d "$newProduct")
printf "Testing add product... "
sleep 1
compare_response "$response" "$expected"

# GET added product
expected="200"
response=$(curl -s -X GET "$address/3" -H "$contentType" -w "$w_flag" -o /dev/null)
printf "Testing get added product... "
sleep 1
compare_response "$response" "$expected"

# PUT product (update)
updateProduct='{"name":"Updated Product","categoryID":2,"price":300}'
expected="200"
response=$(curl -s -X PUT "$address/1" -H "$contentType" -w "$w_flag" -o /dev/null -d "$updateProduct")
printf "Testing update product... "
sleep 1
compare_response "$response" "$expected"

# DELETE product
expected="204"
response=$(curl -s -X DELETE "$address/2" -H "$contentType" -w "$w_flag" -o /dev/null)
printf "Testing delete product... "
sleep 1
compare_response "$response" "$expected"
