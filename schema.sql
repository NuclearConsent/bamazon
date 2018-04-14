CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product VARCHAR(45) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product, department, price, quantity)
VALUES ("Tent", "Camping", 48.76, 10),
       ("Grill", "Outdoors", 116.75, 20),
       ("Bag", "Camping", 26.01, 23),
       ("Dutch Oven", "Cooking", 12.04, 99),
       ("Pants", "Apparel", 43.25, 43),
       ("Gloves", "Apparel", 10.99, 4),
       ("Shoes", "Apparel", 43.87, 19),
       ("Lighter", "Accessories", 1.99, 324),
       ("Bracelet", "Accessories", 30.99, 3),
       ("Hula Hoop", "Fun", 9.99, 32);
