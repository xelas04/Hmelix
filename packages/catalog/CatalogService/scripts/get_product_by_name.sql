-- get_product_by_name

-- скрипт поиска по названию

SELECT * -- вернуть все колонки
FROM products -- из таблицы products
WHERE name LIKE "searchName"; -- где name совпадает с search_name
