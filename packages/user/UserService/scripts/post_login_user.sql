-- post_login_user

-- POST логин

SELECT "userId", "name", "email", "password"
FROM users
WHERE "email" = $1;
