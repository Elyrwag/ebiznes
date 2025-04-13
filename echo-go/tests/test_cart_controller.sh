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

address="$1/cart"
contentType="Content-Type: application/json"
w_flag="%{http_code}"

echo "TESTING CART CONTROLLER"
echo "============================"
echo

# GET allCarts
expected="200"
response=$(curl -s -X GET "$address" -H "$contentType" -w "$w_flag" -o /dev/null)
printf "Testing get allCarts... "
sleep 1
compare_response "$response" "$expected"

# POST Cart (add)
newCart='{"userID":1}'
expected="201"
response=$(curl -s -X POST "$address" -H "$contentType" -w "$w_flag" -o /dev/null -d "$newCart")
printf "Testing add cart... "
sleep 1
compare_response "$response" "$expected"

# GET added cart
expected="200"
response=$(curl -s -X GET "$address/3" -H "$contentType" -w "$w_flag" -o /dev/null)
printf "Testing get added cart... "
sleep 1
compare_response "$response" "$expected"

# PUT cart (update)
updateCart='{"userID":2}'
expected="200"
response=$(curl -s -X PUT "$address/1" -H "$contentType" -w "$w_flag" -o /dev/null -d "$updateCart")
printf "Testing update cart... "
sleep 1
compare_response "$response" "$expected"

# DELETE cart
expected="204"
response=$(curl -s -X DELETE "$address/2" -H "$contentType" -w "$w_flag" -o /dev/null)
printf "Testing delete cart... "
sleep 1
compare_response "$response" "$expected"
