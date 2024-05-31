CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    photoUrl TEXT,
    description TEXT,
    address TEXT,
    phone TEXT,
    permissions INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    grade INTEGER NOT NULL,
    reporterUserId INTEGER NOT NULL,
    reportedUserId INTEGER NOT NULL,
    FOREIGN KEY (reporterUserId) REFERENCES users (id),
    FOREIGN KEY (reportedUserId) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    photoUrl TEXT,
    name TEXT NOT NULL,
    breed TEXT,
    age INTEGER,
    description TEXT,
    ownerId INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS complaints (
    id SERIAL PRIMARY KEY,
    reporterUserId INTEGER NOT NULL,
    reportedPostId INTEGER NOT NULL,
    createdAt TIMESTAMP NOT NULL,
    reason TEXT,
    FOREIGN KEY (reporterUserId) REFERENCES users (id),
    FOREIGN KEY (reportedPostId) REFERENCES posts (id)
);

INSERT INTO users (name, email, password, photoUrl, description, address, phone, permissions)
VALUES
    ('Eduardo Sereia', 'eduardo@mail.com', '123456*aB', 'https://i.imgur.com/tmUa2ir.png', 'Descricao 1', 'Rua Um, 74 - BH', '31 98765-4321', 1),
    ('Juan Botelho', 'juan@mail.com', '123456*aB', 'https://i.imgur.com/tmUa2ir.png', 'Descricao 2', 'Rua Dois, 359 - BH', '31 98765-4321', 0),
    ('Bernardo Emiliano', 'bernardo@mail.com', '123456*aB', 'https://i.imgur.com/tmUa2ir.png', 'Descricao 3', 'Rua Três, 465 - BH', '31 98765-4321', 1),
    ('Rafael Schimidt', 'rafael@mail.com', '123456*aB', 'https://i.imgur.com/tmUa2ir.png', 'Descricao 4', 'Rua Quatro, 981 - BH', '31 98765-4321', 0);

INSERT INTO posts (photoUrl, name, breed, age, description, ownerId, createdAt)
VALUES
    ('https://i.imgur.com/LOQg66l.jpeg', 'Post 1', 'Raca 1', 5, 'Descricao 1', 1, '2014-03-03 02:03:04'),
    ('https://i.imgur.com/XjGncoV.jpeg', 'Post 2', 'Raca 2', 5, 'Descricao 2', 2, '2015-05-22 02:03:04'),
    ('https://i.imgur.com/z9sCEqU.jpeg', 'Post 3', 'Raca 3', 5, 'Descricao 3', 4, '2016-01-10 02:03:04'),
    ('https://i.imgur.com/7A0IgUo.jpeg', 'Post 4', 'Raca 4', 5, 'Descricao 4', 3, '2017-11-01 02:03:04'),
    ('https://i.imgur.com/WT2bMEj.jpeg', 'Post 5', 'Raca 5', 5, 'Descricao 5', 1, '2018-06-13 02:03:04');

INSERT INTO ratings (grade, reporterUserId, reportedUserId)
VALUES
    (3, 1, 4),
    (4, 2, 4),
    (2, 2, 1),
    (3, 4, 3),
    (5, 3, 2);

INSERT INTO complaints (reporterUserId, reportedPostId, reason, createdAt)
VALUES
    (1, 2, 'Reason 1', '2016-05-22 02:33:25'),
    (2, 3, 'Reason 2', '2019-05-22 07:03:04'),
    (4, 3, 'Reason 3', '2020-05-12 11:03:54'),
    (4, 5, 'Reason 4', '2021-05-30 21:13:27'),
    (3, 4, 'Reason 5', '2022-06-25 03:59:04');
