-- create_table_users

-- создание таблицы users

CREATE TABLE "users" (
	"userId" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" VARCHAR(50) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"email" VARCHAR(254) NOT NULL,
	"sex" VARCHAR(10),
	"dateOfBirth" DATE
);
