INSERT INTO categories (name) VALUES ('Category 1');
INSERT INTO categories (name) VALUES ('Category 2');

INSERT INTO products (name, price, category_id) VALUES ('Product 1', 699.99, 1);
INSERT INTO products (name, price, category_id) VALUES ('Product 2', 19.99, 2);

INSERT INTO users (name) VALUES ('User 1');
INSERT INTO users (name) VALUES ('User 2');

INSERT INTO reviews (product_id, rating) VALUES (1, 5);
INSERT INTO reviews (product_id, rating) VALUES (2, 1);

INSERT INTO carts (user_id) VALUES (1);
INSERT INTO carts (user_id) VALUES (2);

INSERT INTO cart_products (cart_id, product_id, count) VALUES (1, 1, 1);
INSERT INTO cart_products (cart_id, product_id, count) VALUES (1, 2, 1);
INSERT INTO cart_products (cart_id, product_id, count) VALUES (2, 2, 2);

-- sqlite3 data.db < ./tests/test_data.sql