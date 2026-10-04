-- get_user_by_id

-- скрипт получения пользователя по userId

SELECT * 
FROM users 
WHERE "userId" = $1;
