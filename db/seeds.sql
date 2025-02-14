INSERT INTO department (id, name)
VALUES 
(1, 'Marketing'),
(2, 'Accounting'),
(3, 'Legal'),
(4, 'Human Resources'),
(5, 'Sales'),
(6, 'IT');

INSERT INTO role (id, title, salary, department_id)
VALUES 
(1, 'Social Media Manager', 80000, 1),
(2, 'CPA', 150000, 2),
(3, 'Compliance Attorney', 200000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'Trisha', 'Taylor', 1, 5),
(2, 'John', 'Smith', 2, 6),
(3, 'Michael', 'Doe', 3, 4),
(4, 'Lindsay', 'Michaels', 3, 6),
(5, 'Christina', 'Devon', 1, NULL),
(6, 'Kevin', 'Swift', 2, 3);