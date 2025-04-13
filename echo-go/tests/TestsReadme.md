# Tests

Simple tests in bash to check if everything is working.

## Controllers data overview:

Product:

```
{
  "id": int, // only in GET method
  "name": str, 
  "price": float
  "categoryID": int,
}
```

Cart:

```
{
  "id": int, // only in GET method
  "userID": int,
  "cartProducts": [
    {
      "productID": int,
      "count": int
    },
    {
      "productID": int,
      "count": int
    }, 
    ...
  ]
}
```

## Test order:

1. Clear database and insert test data
2. ProductController tests
3. CartController tests
4. Clear database (if user chooses 'y' option)

### ProductController tests

1. GET all products (default there are two products)
2. POST (add) product (so now there are three products)
3. GET product with **id=3** (product added in 2.)
4. PUT (update) product with **id=1**
5. DELETE product with **id=2**

### CartController tests

1. GET all categories (default there are two categories)
2. POST (add) cart
3. GET cart with **id=3** (cart added in 2.)
4. PUT (update) cart with **id=1**
5. DELETE cart with **id=2**
