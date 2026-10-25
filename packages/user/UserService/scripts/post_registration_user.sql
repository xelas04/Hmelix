-- post_registration_user

-- POST регистрация

INSERT INTO users ("name", "email", "password", "sex", "dateOfBirth")
VALUES ($1, $2, $3, $4, $5)
RETURNING "userId";
