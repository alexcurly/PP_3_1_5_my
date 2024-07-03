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

INSERT INTO mydb.users (id, First_Name, Last_Name, Age, Email, password)
VALUES (1, 'user', 'user', 20,  'user@mail.ru', '$2a$12$sUfGj2NSK/AurHh8WplhR.BXxjU9rJl995zd4N7toDR1Y/FpfoxMO');

INSERT INTO mydb.roles (id, name) VALUES (1, 'ROLE_ADMIN');

INSERT INTO mydb.roles (id, name) VALUES (2, 'ROLE_USER');

INSERT INTO mydb.users_roles (user_id, role_id) VALUES (1, 1);
