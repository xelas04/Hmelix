-- put_user_by_id

-- скрипт обновления пользователя по userId

UPDATE "users"
SET "name"  = $1,
    "email" = $2
WHERE "userId" = $3;
