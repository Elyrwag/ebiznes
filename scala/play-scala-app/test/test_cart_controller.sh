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

address="$1"

echo "TESTING CART CONTROLLER"
echo "============================"
echo

# GET allCarts
allCarts='[{"id":1,"name":"Cart 1","cartContents":[{"productID":1,"quantity":2},{"productID":2,"quantity":1}]},{"id":2,"name":"Cart 2","cartContents":[{"productID":3,"quantity":10}]}]'
response=$(curl -s -X GET "$address/carts" -H "Content-Type: application/json")
printf "Testing get allCarts... "
sleep 1
compare_response "$response" "$allCarts"

# POST Cart (add)
newCart='{"name":"Cart 3","cartContents":[{"productID":1,"quantity":3},{"productID":2,"quantity":3}]}'
expected='{"id":3,"name":"Cart 3","cartContents":[{"productID":1,"quantity":3},{"productID":2,"quantity":3}]}'
response=$(curl -s -X POST "$address/carts" -H "Content-Type: application/json" -d "$newCart")
printf "Testing add cart... "
sleep 1
compare_response "$response" "$expected"

# GET added cart
response=$(curl -s -X GET "$address/carts/3" -H "Content-Type: application/json")
echo -n "Testing get added cart... "
sleep 1
compare_response "$response" "$expected"

# PUT cart (update)
updateCart='{"name":"Updated Cart","cartContents":[{"productID":1,"quantity":25}]}'
expected='{"id":3,"name":"Updated Cart","cartContents":[{"productID":1,"quantity":25}]}'
response=$(curl -s -X PUT "$address/carts/3" -H "Content-Type: application/json" -d "$updateCart")
echo -n "Testing update cart... "
sleep 1
compare_response "$response" "$expected"

# DELETE cart
expected='[{"id":1,"name":"Cart 1","cartContents":[{"productID":1,"quantity":2},{"productID":2,"quantity":1}]},{"id":3,"name":"Updated Cart","cartContents":[{"productID":1,"quantity":25}]}]'
curl -s -X DELETE "$address/carts/2" -H "Content-Type: application/json"
response=$(curl -s -X GET "$address/carts" -H "Content-Type: application/json")
echo -n "Testing delete cart... "
sleep 1
compare_response "$response" "$expected"
