
INSERT INTO departments (name)
VALUES ('Customer Service');
INSERT INTO departments (name)
VALUES ('Sales');
INSERT INTO departments (name)
VALUES ('Technology');
INSERT INTO departments (name)
VALUES ('Management');
INSERT INTO departments (name)
VALUES ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES ('General Manager', 100000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ('Salesman', 80000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ('IT engineer', 75000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ('CS Representative', 55000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ('Human Resource Officer', 75000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'Smith', 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Susan', 'Jones', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mat', 'Cauthon', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Perrin', 'Aybara', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Nynaeve', 'Meara', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Egwene', 'Vere', 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Rand', 'Althor', 4, null);