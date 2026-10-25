-- create_table

-- создание таблицы products

CREATE TABLE products (
	productid INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	price NUMERIC(10, 2)
);
