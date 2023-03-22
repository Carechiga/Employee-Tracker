const inquirer = require('inquirer');
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2019Millie4sql',
    database:'employee_db'
});

const employeeTrackerChoices = () => {
inquirer.prompt([
    {
       type: "list",
       name: "action",
       message: "What would you like to do?",
       choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department", "Update employee managers", "View employees by manager", "View employees by department", "Delete employee", "Delete department", "Delete role", "View total utilized budget", "Quit"], 
    }
])
.then((data => {
    console.log(data);
    const { action } = data;

    switch(action){
        case "View all employees":
            console.log("Showing all employees...");
            employeeTrackerChoices();
            break;
        case "Add employee":
            console.log("Adding employee...")
            employeeTrackerChoices();
            break;
        case "Update employee role":
            console.log("Updating employee role...")
            employeeTrackerChoices();
            break;
        case "View all roles":
            console.log("Showing all roles...");
            employeeTrackerChoices();
            break;
        case "Add role":
            console.log("Adding role...");
            employeeTrackerChoices();
            break;
        case "View all departments":
            console.log("Showing all departments...");
            employeeTrackerChoices();
            break;
        case "Add department":
            console.log("Adding department...");
            employeeTrackerChoices();
            break;
        case "Update employee Managers":
            console.log("Updating employee managers...");
            employeeTrackerChoices();
            break;
        case "View employees by manager":
            console.log("Showing all employees by manager...");
            employeeTrackerChoices();
            break;
        case "View employees by department":
            console.log("Showing all employees by department...");
            employeeTrackerChoices();
            break;
        case "Delete employee":
            console.log("Deleting employee...");
            employeeTrackerChoices();
            break;
        case "Delete department":
            console.log("Deleting department...");
            employeeTrackerChoices();
            break;
        case "Delete role":
            console.log("Deleting role...");
            employeeTrackerChoices();
            break;
        case "Quit":
            console.log("Exiting application...");
            connection.end();
            break;
    }
    
}))
}
employeeTrackerChoices();