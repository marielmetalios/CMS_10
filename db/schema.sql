DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
)

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DEC,
    department_id INT, FOREIGN KEY (department) REFERENCES department(id) ON DELETE SET NULL
)

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    manager_id INT REFERENCES employee(id) ON DELETE SET NULL
)
