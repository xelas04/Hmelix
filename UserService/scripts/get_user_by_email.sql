-- get_user_by_email

-- (login) скрипт получения пользователя по email 

SELECT "userId", "name", "email", "password", "sex", "dateOfBirth" 
FROM users 
WHERE "email" = @email
LIMIT 1 ;
