CREATE DATABASE weatherDB;

CREATE TABLE location (
    id serial not null primary key,
    name varchar(20) not null
);

CREATE TABLE weatherinfo (
    id serial not null primary key,
    cityID serial not null references location(id),
    temperature decimal(4,1) not null,
    postedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO location (id, name) VALUES (1, 'Amsterdam');
INSERT INTO location (id, name) VALUES (2, 'Tokyo');
INSERT INTO location (id, name) VALUES (3, 'Helsinki');
INSERT INTO location (id, name) VALUES (4, 'Dubai');
INSERT INTO location (id, name) VALUES (5, 'New York');

INSERT INTO weatherinfo (cityID, temperature) VALUES (1, 1);
INSERT INTO weatherinfo (cityID, temperature) VALUES (2, 2);
INSERT INTO weatherinfo (cityID, temperature) VALUES (3, 3);
INSERT INTO weatherinfo (cityID, temperature) VALUES (4, 4);
INSERT INTO weatherinfo (cityID, temperature) VALUES (5, 5);
INSERT INTO weatherinfo (cityID, temperature) VALUES (1, 12.0);
INSERT INTO weatherinfo (cityID, temperature) VALUES (2, 9.0);
INSERT INTO weatherinfo (cityID, temperature) VALUES (3, 2.3);
INSERT INTO weatherinfo (cityID, temperature) VALUES (4, 30.1);
INSERT INTO weatherinfo (cityID, temperature) VALUES (5, 4.0);
INSERT INTO weatherinfo (cityID, temperature) VALUES (1, 5.7);
INSERT INTO weatherinfo (cityID, temperature) VALUES (2, 10.0);
INSERT INTO weatherinfo (cityID, temperature) VALUES (3, -4.9);
INSERT INTO weatherinfo (cityID, temperature) VALUES (4, 31.1);
INSERT INTO weatherinfo (cityID, temperature) VALUES (5, 2.0);
INSERT INTO weatherinfo (cityID, temperature) VALUES (1, 3.4);
INSERT INTO weatherinfo (cityID, temperature) VALUES (2, 12.4);
INSERT INTO weatherinfo (cityID, temperature) VALUES (3, -2.3);
INSERT INTO weatherinfo (cityID, temperature) VALUES (4, 29.1);
INSERT INTO weatherinfo (cityID, temperature) VALUES (5, 5.6);

