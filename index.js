const inquirer = require('inquirer');
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));
const mysql = require('mysql2');
const cTable = require('console.table');


//create connection to database using this connection object
//password removed for security
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'employee_db'
});

const employeeTrackerChoices = () => {
inquirer.prompt([
    {
       type: "list",
       name: "action",
       message: "What would you like to do?",
       choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department", "Update employee manager", "View employees by manager", "View employees by department", "Delete employee", "Delete department", "Delete role", "View budget by department", "Quit"], 
    }
])
.then((data => {
    console.log(data);
    const { action } = data;
//switch statement to handle user input flow after theyve selected from list above, will loop for all options except "quit"
    switch(action){
        case "View all employees":
            console.log("Showing all employees...");
            connection.query('SELECT * FROM employee', (err, employee) => {
                if(err) {console.log(err)};
                console.log('\n');
                console.table(employee);
            });
            employeeTrackerChoices();
            break;
        case "Add employee":
            console.log("Adding employee...")
            addEmployee();
            break;
        case "Update employee role":
            console.log("Updating employee role...")
            updateEmployeeRole();
            break;
        case "View all roles":
            console.log("Showing all roles...");
            connection.query('SELECT * FROM roles', (err, roles) => {
                if(err) {console.log(err)};
                console.log('\n');
                console.table(roles);
            });
            employeeTrackerChoices();
            break;
        case "Add role":
            console.log("Adding role...");
            addRole();
            break;
        case "View all departments":
            console.log("Showing all departments...");
            connection.query('SELECT * FROM departments', (err, departments) => {
                if(err) {console.log(err)};
                console.log('\n');
                console.table(departments);
            });
            employeeTrackerChoices();
            break;
        case "Add department":
            console.log("Adding department...");
            addDepartment();
            break;
        case "Update employee manager":
            console.log("Updating employee managers...");
            updateManager();
            break;
        case "View employees by manager":
            console.log("Showing all employees by manager...");
            employeesByManager();
            break;
        case "View employees by department":
            console.log("Showing all employees by department...");
            employeesByDepartment();    
            break;
        case "Delete employee":
            console.log("Deleting employee...");
            deleteEmployee();
            break;
        case "Delete department":
            console.log("Deleting department...");
            deleteDepartment();
            break;
        case "Delete role":
            console.log("Deleting role...");
            deleteRole();
            break;
        case "View budget by department":
            console.log("Retrieving department budget...");
            viewBudget();
            break;
        case "Quit":
            console.log("Exiting application...");
            connection.end();
            break;
    }
    
}))
}

const addEmployee = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?"
    },
    {
        type: 'input',
        name: 'role_id',
        message: "What is the employee's Role id number?"
    },
    {
        type: 'list',
        name: 'manager',
        message: "Is the employee a manager?",
        choices: ['yes', 'no']
    },
])
.then(employee => {
    console.log(employee);
    if(employee.manager === "yes"){
        delete employee.manager; 
        console.log(employee);
        connection.query('INSERT INTO employee SET ?', employee, err => {if(err){console.log(err)}});
        employeeTrackerChoices();
    }else{
        inquirer.prompt([{
            type: 'input',
            name: 'manager_id',
            message: "What is the id of this employee's manager"
        }])
        .then(employee2 => {
            delete employee.manager;
            let newEmployee = {
                ...employee,
                manager_id: employee2.manager_id
            }
            connection.query('INSERT INTO employee SET ?', newEmployee, err => {if(err){console.log(err)}});
            employeeTrackerChoices();
        })
    }
})
};

const updateEmployeeRole = () =>{
    inquirer.prompt([
    {
        type: 'input',
        name: 'id',
        message: 'What is the id of the employee you want to update?'
    },
    {
        type: 'input',
        name: 'role_id',
        message: 'What is the new role of the employee? (please give the role id number)?'
    },
])
    .then(employee => {
        let updatedEmployee = {
            role_id: employee.role_id
        }
        connection.query(`UPDATE employee SET ? WHERE id = ${employee.id}`, updatedEmployee, err => {if(err){console.log(err)}});
        employeeTrackerChoices();
       })
  }

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: "What is the role that you want to add?", 
        },
        {
            type: 'input',
            name: 'salary',
            message: "What is the salary?", 
        },
        {
            type: 'input',
            name: 'department_id',
            message: "What is the department ID for this role?", 
        },
    ])
    .then(role => {
        console.log(role);
        //takes use input and adds to the roles table
        connection.query('INSERT INTO roles SET ?', role, err => {if(err){console.log(err)}});
        //this loops back to original inquiry
        employeeTrackerChoices();
    }
    )
    
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is the name of the department to add?"
        }
])
.then(department => {
    console.log(department);
    //inserts user input into departments table in db
    connection.query('INSERT INTO departments SET ?', department, err => {if(err) {console.log(err)}})
    console.log('Department added...');
    //loop back to original in  uiry
    employeeTrackerChoices();
})

}

const updateManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee you want to update?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the new manager id of this employee?'
        },
    ])
        .then(employee => {
            let updatedEmployee = {
                manager_id: employee.manager_id
            }
            connection.query(`UPDATE employee SET ? WHERE id = ${employee.id}`, updatedEmployee, err => {if(err){console.log(err)}});
            employeeTrackerChoices();
})
}

const deleteEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the employee you want to delete?'
        }
     ])
        .then(employee => {
            connection.query(`DELETE FROM employee WHERE id = ${employee.id}`)
            employeeTrackerChoices();
        }
            
        );
    }  


const deleteRole = () => {
inquirer.prompt([
    {
        type: 'input',
        name: 'id',
        message: 'What is the id of the role you want to delete?'
    }
 ])
 .then(role => {
    connection.query(`DELETE FROM roles WHERE id = ${role.id}`)
    employeeTrackerChoices();
}
    
);
} 

const deleteDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id of the department you want to delete?'
        }
     ])
     .then(department => {
        connection.query(`DELETE FROM departments WHERE id = ${department.id}`)
        employeeTrackerChoices();
    }
 );
} 

const employeesByDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: "What is the id number of the department you would like to view?"
        },
    ])
    .then(department => {
        //must use INNER JOIN to get connect employee table to roles table and then the departments table
        connection.query(`SELECT employee.first_name, employee.last_name, departments.name AS Department
        FROM ((employee 
            INNER JOIN roles ON employee.role_id = roles.id)
            INNER JOIN departments ON roles.department_id = departments.id) 
            WHERE department_id = ${department.department_id}`, (err, employee) => {
            if(err) {console.log(err)}
            console.log('\n');
            console.table(employee);
            employeeTrackerChoices();})
    })
}  

const employeesByManager = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager_id',
            message: "What is the id number of the manager you would like to view?"
        }
    ])
    .then(manager => {
        connection.query(`SELECT * FROM employee WHERE manager_id = ${manager.manager_id}`, (err, employee) => {
            if(err) {console.log(err)};
            console.log('\n');
            console.table(employee);
            employeeTrackerChoices();})
     });
}   
 
const viewBudget = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: "Which department's budget would you like to view?(Please enter the department id)"
        }
    ])
    .then(department => {
        //'AS' has the column name alias set to Budget for ease of viewing
        connection.query(`SELECT departments.name AS Department, SUM(Salary) AS Budget 
        FROM ((employee 
            INNER JOIN roles ON employee.role_id = roles.id)
            INNER JOIN departments ON roles.department_id = departments.id) 
            WHERE department_id = ${department.department_id}`, (err, employee) => {
            if(err) {console.log(err)}
            console.log('\n');
            console.table(employee);
            employeeTrackerChoices();})
    })
}

employeeTrackerChoices();