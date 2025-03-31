# Tests

Simple tests in bash to check if everything is working.

## Controllers data overview:

Product:

```
{
  "id": int, // only in GET method
  "name": str, 
  "categoryID": int,
  "price": double
}
```

Category:

```
{
  "id": int, // only in GET method
  "name": str
}
```

Cart:

```
{
  "id": int, // only in GET method
  "name": str,
  "cartContents": [
    {
      "productID": int,
      "quantity": int
    },
    {
      "productID": int,
      "quantity": int
    }, 
    ...
  ]
}
```

## Test order:

1. ProductController tests
2. CategoryController tests
3. CartController tests

### ProductController tests

1. GET all products (default there are two products)
2. POST (add) product (so now there are three products)
3. GET product with **id=3** (product added in 2.)
4. PUT (update) product with **id=3**
5. DELETE product with **id=2** and check with GET all products if there are only products with **id=1** and **id=3**

### CategoryController tests

1. GET all categories (default there are two categories)
2. POST (add) category
3. GET category with **id=3** (category added in 2.)
4. PUT (update) category with **id=3**
5. DELETE category with **id=2** and check with GET all categories if there are only categories with **id=1** and **id=3**

### CartController tests

1. GET all carts (default there are two carts)
2. POST (add) carts
3. GET cart with **id=3** (cart added in 2.)
4. PUT (update) cart with **id=3**
5. DELETE cart with **id=2** and check with GET all carts if there are only carts with **id=1** and **id=3**
