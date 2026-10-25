-- delete_user_by_id

-- скрипт удаления строки пользователя

DELETE FROM "users"
WHERE "userId" = $1;
