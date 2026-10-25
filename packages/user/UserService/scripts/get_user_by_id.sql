-- get_user_by_id

-- скрипт получения пользователя по userId

SELECT "userId", "name", "email", "sex", "dateOfBirth" 
FROM users 
WHERE "userId" = $1;
