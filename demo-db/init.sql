CREATE DATABASE IF NOT EXISTS `demo_db` DEFAULT CHARACTER
SET
    utf8;

CREATE TABLE
    IF NOT EXISTS `demo_db`.`user` (
        `id` VARCHAR(36) NOT NULL,
        `mail` VARCHAR(255) NOT NULL,
        `password` VARCHAR(60) NOT NULL,
        `mail_confirmation` TINYINT (1) NULL DEFAULT 0,
        PRIMARY KEY (`id`),
        UNIQUE INDEX `mail_UNIQUE` (`mail` ASC) VISIBLE
    );

INSERT INTO
    `demo_db`.`user` (id, mail, password, mail_confirmation)
SELECT
    *
FROM
    (
        SELECT
            '0ef18523-46fe-46ad-b5f1-251bc959699c' AS id,
            'natalja.ru@gmail.com' AS mail,
            '$2a$10$vQLJ/n.hxsC0W3CD18sZ6.2Bt1U5aQwu67IdjMs4gcWRVen.1cSCC' AS password,
            1 AS mail_confirmation
    ) AS temp
WHERE
    NOT EXISTS (
        SELECT
            id
        FROM
            `demo_db`.`user`
        WHERE
            id = '0ef18523-46fe-46ad-b5f1-251bc959699c'
    )
LIMIT
    1;

INSERT INTO
    `demo_db`.`user` (id, mail, password, mail_confirmation)
SELECT
    *
FROM
    (
        SELECT
            'b5f6f829-089e-4e33-b8d0-925c2b1a2b00' AS id,
            'tavdeenko@mail.ru' AS mail,
            '$2a$10$xFCqUQotjeO1NGCkHkabGOy9KpWC4uYOtLFc0wJc/2nxsY5yYvPQW' AS password,
            1 AS mail_confirmation
    ) AS temp
WHERE
    NOT EXISTS (
        SELECT
            id
        FROM
            `demo_db`.`user`
        WHERE
            id = 'b5f6f829-089e-4e33-b8d0-925c2b1a2b00'
    )
LIMIT
    1;

INSERT INTO
    `demo_db`.`user` (id, mail, password, mail_confirmation)
SELECT
    *
FROM
    (
        SELECT
            '3e42b168-2107-42f7-8138-e36c21e8e973' AS id,
            'se16052000@mail.ru' AS mail,
            '$2a$10$RUCH/VC3SVCJ4W5Tr3.26uDZYlPOz8mY7gpU1Ku7WL1DW0yxE8C.q' AS password,
            1 AS mail_confirmation
    ) AS temp
WHERE
    NOT EXISTS (
        SELECT
            id
        FROM
            `demo_db`.`user`
        WHERE
            id = '3e42b168-2107-42f7-8138-e36c21e8e973'
    )
LIMIT
    1;