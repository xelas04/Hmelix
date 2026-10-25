-- некоторые скрипты

-- скрипт создания БД

CREATE DATABASE catalog
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1

-- создание таблицы products

CREATE TABLE products (
	"productId" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	price NUMERIC(10, 2)
);

-- скрипт поиска по названию

SELECT * -- вернуть все колонки
FROM products -- из таблицы products
WHERE name LIKE @searchName; -- где name совпадает с search_name

-- скрипт поиска по id

SELECT * 
FROM products 
WHERE "productId" = id;

-- скрипт получения всех строк в БД (без пагинации)

SELECT *
FROM products

-- скрипт получения страницы по (LIMIT)-записей на странице (с пагинацией)
-- пропустив первые: OFFSET

SELECT * -- выбрать все колонки
FROM products -- из таблицы products
LIMIT 10 OFFSET 0; -- по 10 строк, с нулевой
