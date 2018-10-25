-- Drops the bamazon DB if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the "bamazon" db --
CREATE DATABASE bamazon;

CREATE TABLE products
(
    item_id INTEGER(7) NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR NOT NULL,
    dept_name VARCHAR,
    price DECIMAL
    (13,4),
    stock_qty INTEGER
    (7),
    PRIMARY KEY
    (item_id)
);

    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Soccer Ball", "Sports", 32.99, 10);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Rollerblades", "Sports", 52.99, 3);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Knee Pads", "Sports", 7.99, 50);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Kettle", "Kitchen", 18.99, 14);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Electric Spoon", "Kitchen", 21.99, 16);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Stand Mixer", "Kitchen", 349.99, 22);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Garden Hose", "Lawn/Garden", 44.99, 10);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Flower Pot", "Lawn/Garden", 3.99, 19);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("Adirondac Chair", "Lawn/Garden", 45.99, 130);
    INSERT INTO products
        (product_name, dept_name, price, stock_qty)
    VALUES
        ("iPod", "Electronics", 299.99, 104);