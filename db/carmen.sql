-- Antes de realizar cualquier consulta
use carmendb

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    image_url VARCHAR(255)
);
describe category

INSERT INTO category (name, image_url) VALUES ('varones', 'hello');
INSERT INTO category (name,image_url) VALUES ('damas', 'hello');
INSERT INTO category (name, image_url) VALUES ('otros', 'hello');

select * from category



CREATE TABLE object (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    name VARCHAR(100) NOT NULL,
    image_url VARCHAR(255), 
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);


select * from object
-- Insertar categorías
INSERT INTO object (category_id, name, image_url) VALUES ("1", 'Polo', 'hello');
INSERT INTO object (category_id, name, image_url) VALUES ("2", 'Pantalon','https://www.shutterstock.com/image-photo/blue-jeans-isolated-on-white-260nw-2248481459.jpg');
INSERT INTO object (category_id, name, image_url) VALUES ("3", 'Lapizero','test1');
INSERT INTO object (category_id, name, image_url) VALUES ("2", 'blusa', 'test2');
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
/*CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL
);*/

/*  INSERT INTO products (name, description) VALUES
("Camisa", 'prenda para especiliada de adm'),
("Bolso", 'parte del material de estudio' );
*/

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

