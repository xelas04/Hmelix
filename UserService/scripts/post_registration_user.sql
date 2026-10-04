-- post_registration_user

-- POST регистрация

INSERT INTO users ("name", "email", "password")
VALUES ($1, $2, $3)
RETURNING "userId", "name", "email";
