# KATA Academy. PRE-PROJECT

# 3.1.5 Rest controllers

### Задание: 

1. Написать Rest-контроллеры для вашего приложения.
2. Переписать вывод (заполнение) таблицы, модальных окон и т.д. на JS c помощью Fetch API, допускается использование JQuery.
3. При любых изменениях данных страница приложения не должна перезагружаться!

#### Ссылки:

https://learn.javascript.ru/fetch

https://habr.com/ru/company/otus/blog/440046/

### SQL request
При запуске приложения необходимо ввести SQL реквест в консоль БД. Код приложен с файлом 'SQL_request.txt' , либо можно скопировать отсюда:

INSERT INTO mydb.users (id, age, email, first_name, last_name, password, username)
VALUES (1, 18, 'user@mail.ru', 'user', 'user', '$2a$12$oOatp7uvpqnrRJBo7.ZnCeZTRe7nSd/40sCUDyg/ln/RNMlwrX/SK', 'user');

INSERT INTO mydb.roles (id, role_name)
VALUES (1, 'ROLE_ADMIN');

INSERT INTO mydb.roles (id, role_name)
VALUES (2, 'ROLE_USER');

INSERT INTO mydb.users_roles (user_id, role_id)
VALUES (1, 1);
