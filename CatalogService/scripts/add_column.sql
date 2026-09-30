-- add_column

-- скрипт создания нового столбца orders_count с ненулевым целочисленным значением по умолчанию 0

ALTER TABLE products 
ADD COLUMN orders_count INTEGER NOT NULL DEFAULT 0;
