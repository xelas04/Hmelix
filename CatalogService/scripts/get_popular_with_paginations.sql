-- get_popular_with_pagination

-- скрипт получения страницы по 3-записи на странице с пагинацией
-- по умолчанию будет 3, как в шаблоне
-- Формула для OFFSET: OFFSET = (page - 1) * pageSize

SELECT * -- выбрать все колонки
FROM products -- из таблицы products
ORDER BY orders_count DESC -- сортировать по orders_count по убыванию
LIMIT 3 OFFSET 0; -- по 3 строки, первой страницы
