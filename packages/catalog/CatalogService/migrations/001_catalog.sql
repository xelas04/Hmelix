CREATE DATABASE catalog
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1

CREATE TABLE products (
	ProductId INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Price NUMERIC(10, 2)
);

@"SELECT productid, name, price 
FROM products 
ORDER BY productid 
LIMIT 10 OFFSET 0";

@"SELECT productid, name, price
FROM products
WHERE Name
LIKE @searchQuery"
