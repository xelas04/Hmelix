CREATE DATABASE catalog
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LOCALE_PROVIDER = 'libc'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False

-- создание таблицы

CREATE TABLE products (
	product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	price NUMERIC(10, 2)
);

-- функция поиска по названию

CREATE OR REPLACE FUNCTION find_products(search_name TEXT)
RETURNS TABLE (
    product_id INT,
    name VARCHAR(50),
    price NUMERIC(10, 2)
) AS $$
    SELECT product_id, name, price 
    FROM products 
    WHERE name ILIKE CONCAT('%', search_name, '%');
$$ LANGUAGE sql;
