-- Antes de realizar cualquier consulta
use carmendb

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL
);

describe category
INSERT INTO category (name) VALUES ('varones');
INSERT INTO category (name) VALUES ('damas');
INSERT INTO category (name) VALUES ('otros');
select * from category



CREATE TABLE object (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);
select * from object
-- Insertar categorías
INSERT INTO object (category_id, name) VALUES ("1", 'Polo');
INSERT INTO object (category_id, name) VALUES ("2", 'Polo');
INSERT INTO object (category_id, name) VALUES ("3", 'Lapizero');
INSERT INTO object (category_id, name) VALUES ("2", 'blusa');
select * from object
describe object

CREATE TABLE detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    object_id INT,
    details VARCHAR(10) NOT NULL,
    stock INT,
    precio_unitario DECIMAL(10, 2),
    FOREIGN KEY (object_id) REFERENCES object(id) ON DELETE CASCADE
);

-- Insertar varias tallas o details para la blusa de dama con object_id = 5
INSERT INTO detail (object_id, details, stock, precio_unitario) VALUES 
(4, 'S', 50, 19.99),
(4, 'M', 60, 20.99),
(4, 'L', 40, 21.99),
(4, 'XL', 30, 22.99);
describe detail
select * from detail

-- Test table products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);
INSERT INTO productos (name) VALUES
("Camisa"),
("Bolso");

-- Lineas para eliminar todas las tablas, no ejecutar en la creacion de nuevos valores
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS detail;
DROP TABLE IF EXISTS object;
DROP TABLE IF EXISTS category;

CREATE TABLE stock_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    detail_id INT,
    category_name VARCHAR(25),
    object_name VARCHAR(100),
    details VARCHAR(10),
    quantity_added INT,
    new_stock INT,
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sales_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    object_id INT,
    details VARCHAR(10) NOT NULL,
    quantity_sold INT NOT NULL,
    remaining_stock INT NOT NULL,
    sale_price DECIMAL(10, 2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (object_id) REFERENCES object(id)
);

