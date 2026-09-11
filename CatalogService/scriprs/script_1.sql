-- некоторые скрипты

-- скрипт создания БД

CREATE DATABASE catalog
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1

-- создание таблицы products

CREATE TABLE products (
	product_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	price NUMERIC(10, 2)
);

-- функция поиска по названию

CREATE OR REPLACE FUNCTION get_product_by_name(search_name TEXT) -- функция, чтобы
RETURNS TABLE ( -- вернуть таблицу:
    product_id INT,
    name VARCHAR(50),
    price NUMERIC(10, 2)
) AS $$ -- тело функции
    SELECT * -- вернуть все колонки
    FROM products -- из таблицы products
    WHERE name ILIKE CONCAT('%', search_name, '%'); -- где name совпадает с search_name
$$ LANGUAGE sql; -- написано на sql

-- функция получения товара из каталога - так явнее что вернётся

CREATE OR REPLACE FUNCTION get_product_by_id(id INTEGER)
RETURNS TABLE (
    product_id INT,
    name VARCHAR(50),
    price NUMERIC(10, 2)
) AS $$
    SELECT * 
    FROM products 
    WHERE product_id = id;
$$ LANGUAGE sql;

-- функция получения товара из каталога, но короче

CREATE OR REPLACE FUNCTION get_product_by_id(id INTEGER)
RETURNS products AS $$ -- такая же функция, что и предыдущая
    SELECT * 
    FROM products 
    WHERE product_id = id;
$$ LANGUAGE sql;

-- скрипт получения страницы по (LIMIT)-записей на странице с пагинацией
-- Формула для OFFSET: OFFSET = (page - 1) * pageSize
SELECT * -- выбрать все колонки
FROM products -- из таблицы products
ORDER BY product_id ASC -- сортировать по product_id по возрастанию
LIMIT 10 OFFSET 0; -- по 10 строк, первой страницы
