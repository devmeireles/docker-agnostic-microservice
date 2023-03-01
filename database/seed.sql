CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL,
  name varchar(64) NOT NULL,
  email varchar(128) NOT NULL,
  password varchar(128) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL NOT NULL,
  name varchar(64) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO
    products (name)
VALUES
    ('New cozy shoes'),
    ('Modern smartphone'),
    ('Green Basketball');
