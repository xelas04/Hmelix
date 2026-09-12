-- get_products_with_pagination

-- скрипт получения страницы по (LIMIT)-записей на странице с пагинацией
-- Формула для OFFSET: OFFSET = (page - 1) * pageSize

SELECT * -- выбрать все колонки
FROM products -- из таблицы products
LIMIT 10 OFFSET 0; -- по 10 строк, первой страницы
