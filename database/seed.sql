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
  price DOUBLE PRECISION NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO public.products(
	name, price)
	VALUES ('Super Skate', 75.30),
	('Soccer Ball', 15.10),
	('Bubble gum', 5.70),
  ('New cozy shoes', 11.90),
  ('Modern smartphone', 22),
  ('Green Basketball', 5.55);