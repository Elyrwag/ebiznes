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

echo "TESTING CATEGORY CONTROLLER"
echo "============================"
echo

# GET allCategories
allCategories='[{"id":1,"name":"Category 1"},{"id":2,"name":"Category 2"}]'
response=$(curl -s -X GET "$address/categories" -H "Content-Type: application/json")
printf "Testing get allCategories... "
sleep 1
compare_response "$response" "$allCategories"

# POST Category (add)
newCategory='{"name":"New Category"}'
expected='{"id":3,"name":"New Category"}'
response=$(curl -s -X POST "$address/categories" -H "Content-Type: application/json" -d "$newCategory")
printf "Testing add category... "
sleep 1
compare_response "$response" "$expected"

# GET added category
response=$(curl -s -X GET "$address/categories/3" -H "Content-Type: application/json")
echo -n "Testing get added category... "
sleep 1
compare_response "$response" "$expected"

# PUT category (update)
updateCategory='{"name":"Updated Category"}'
expected='{"id":3,"name":"Updated Category"}'
response=$(curl -s -X PUT "$address/categories/3" -H "Content-Type: application/json" -d "$updateCategory")
echo -n "Testing update category... "
sleep 1
compare_response "$response" "$expected"

# DELETE category
expected='[{"id":1,"name":"Category 1"},{"id":3,"name":"Updated Category"}]'
curl -s -X DELETE "$address/categories/2" -H "Content-Type: application/json"
response=$(curl -s -X GET "$address/categories" -H "Content-Type: application/json")
echo -n "Testing delete category... "
sleep 1
compare_response "$response" "$expected"
