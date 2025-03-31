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

echo "TESTING PRODUCT CONTROLLER"
echo "============================"
echo

# GET allProducts
allProducts='[{"id":1,"name":"Product 1","categoryID":2,"price":100},{"id":2,"name":"Product 2","categoryID":1,"price":200}]'
response=$(curl -s -X GET "$address/products" -H "Content-Type: application/json")
printf "Testing get allProducts... "
sleep 1
compare_response "$response" "$allProducts"

# POST Product (add)
newProduct='{"name":"New Product","categoryID":2,"price":250.5}'
expected='{"id":3,"name":"New Product","categoryID":2,"price":250.5}'
response=$(curl -s -X POST "$address/products" -H "Content-Type: application/json" -d "$newProduct")
printf "Testing add product... "
sleep 1
compare_response "$response" "$expected"

# GET added product
response=$(curl -s -X GET "$address/products/3" -H "Content-Type: application/json")
echo -n "Testing get added product... "
sleep 1
compare_response "$response" "$expected"

# PUT product (update)
updateProduct='{"name":"Updated Product","categoryID":2,"price":300}'
expected='{"id":3,"name":"Updated Product","categoryID":2,"price":300}'
response=$(curl -s -X PUT "$address/products/3" -H "Content-Type: application/json" -d "$updateProduct")
echo -n "Testing update product... "
sleep 1
compare_response "$response" "$expected"

# DELETE product
expected='[{"id":1,"name":"Product 1","categoryID":2,"price":100},{"id":3,"name":"Updated Product","categoryID":2,"price":300}]'
curl -s -X DELETE "$address/products/2" -H "Content-Type: application/json"
response=$(curl -s -X GET "$address/products" -H "Content-Type: application/json")
echo -n "Testing delete product... "
sleep 1
compare_response "$response" "$expected"
