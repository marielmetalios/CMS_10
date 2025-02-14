import inquirer from "inquirer";
import { pool } from "./connection";

// questions for CLI app
const mainMenu = async () => {
    const { choice } = await inquirer.prompt([

        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all Employees",
                "Add Employee",
                "Update Employee Role",
                "View all Roles",
                "Add Role",
                "View all Departments",
                "Add Department",
                "Exit"
            ]
        }
    ]);
    switch (choice) {
        case "View all Employees": return viewAllEmployees();
        case "Add Employee": return addEmployee();
        case "Update Employee Role": return updateEmployeeRole();
        case "View all Roles": return viewAllRoles();
        case "Add Role": return addRole();
        case "View all Departments": return viewAllDepartments();
        case "Add Department": return addDepartment();
        case "Exit": return process.exit();
    }
};

mainMenu();

const viewAllEmployees = async () => {
    const { rows } = await pool.query(`
          SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary,
                 CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM employee e
          LEFT JOIN role ON e.role_id = role.id
          LEFT JOIN department ON role.department_id = department.id
          LEFT JOIN employee m ON e.manager_id = m.id
        `);
    console.table(rows);
    mainMenu();
};


const addEmployee = async () => {
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        { type: "input", name: "first_name", message: "Enter the first name:" },
        { type: "input", name: "last_name", message: "Enter the last name:" },
        { type: "input", name: "role_id", message: "Enter the role ID:" },
        { type: "input", name: "manager_id", message: "Enter the manager ID (or leave blank for none):" }
    ]);

    await pool.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
        [first_name, last_name, role_id, manager_id || null]);

    console.log(`Added employee: ${first_name} ${last_name}`);
    mainMenu();
};


const updateEmployeeRole = async () => {
    const { employee_id, new_role_id } = await inquirer.prompt([
        { type: "input", name: "employee_id", message: "Enter the employee ID:" },
        { type: "input", name: "new_role_id", message: "Enter the new role ID:" }
    ]);

    await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [new_role_id, employee_id]);
    console.log(`Updated employee role`);
    mainMenu();
};

const viewAllRoles = async () => {
    const { rows } = await pool.query(`
          SELECT role.id, role.title, role.salary, department.name AS department
          FROM role
          JOIN department ON role.department_id = department.id
        `);
    console.table(rows);
    mainMenu();
};

const addRole = async () => {
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter the role title:"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary:"
        },
        {
            type: "input",
            name: "department_id",
            message: "Enter the department ID:"
        }
    ]);

    await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, department_id]);
    console.log(`Added role: ${title}`);
    mainMenu();
};


const viewAllDepartments = async () => {
    const { rows } = await pool.query("SELECT * FROM department");
    console.table(rows);
    mainMenu();
};

const addDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the department name:"
        }
    ]);

    await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
    console.log(`Added department: ${name}`);
    mainMenu();
};


