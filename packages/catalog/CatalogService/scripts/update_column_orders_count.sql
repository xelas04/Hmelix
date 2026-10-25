-- update_column_orders_count

-- скрипт обновления значения orders_count у продукта при заказе

UPDATE orders_count
SET orders_count = orders_count + 1
WHERE productid = @productid
