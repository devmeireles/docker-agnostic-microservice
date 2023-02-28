CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL,
  name varchar(64) NOT NULL,
  email varchar(128) NOT NULL,
  password varchar(128) NOT NULL,
  PRIMARY KEY (id)
);