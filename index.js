const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

//variable to store employee data
const employees = [];
const manager = [];

// create a function for rendering html and add employees

function startApp() {
    generateHTML();
    checkPrivileges();
}

function checkPrivileges() {
    inquirer.prompt([{
        type: 'confirm',
        name: 'managerAccess',
        message: 'Are you a manager?',
        default: false
    }]).then(function({managerAccess}) {
        // console.log(value)
        if(managerAccess === true) {
            console.log('Initiating application');
            return managerInfo();
            }
        if(managerAccess === false) {
            console.log('Only managers have access!');
            }
        }
    )
};

function managerInfo() {
    inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is your name?",
      validate: (value) => {
        if(value) {
          return true;
        }
        console.log('Please enter your name!')
        return false;
      },
    },
    {
      type: 'input',
      name: 'id',
      message: "What is your employee id?",
      validate: (value) => {
        if(value) {
          return true;
        }
        console.log('Please enter your employee id!')
        return false;
      },
    },
    {
      type: 'input',
      name: 'email',
      message: "What is your email?",
      validate: (value) => {
        if(value) {
          return true;
        }
        console.log('Please enter your email!')
        return false;
      },
    },
    {
      type: 'input',
      name: 'office',
      message: "What is your office number?",
      validate: (value) => {
        if(value) {
          return true;
        }
        console.log('Please enter your office number!')
        return false;
      },
    }
    ]).then(function({name, id, email, office}) {
        let newManager = new Manager(name, id, email, office);
        manager.push(newManager);
        newEmployee();
        // console.log(manager);
    })
};

function newEmployee() {
    console.log('Adding new employee...');
    inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "What is your team member's name?",
      validate: (value) => {
        if(value) {
          return true;
        }
        console.log('Please enter a name!')
        return false;
      },
    },
    {
      type: 'list',
      name: 'role',
      message: "What is your new team member's role?",
      choices: [ "Engineer", "Intern"]
    },
    {
      type: 'input',
      name: 'id',
      message: "What is his or her employee id?",
      validate: (value) => {
        if(value) {
          return true;
        }
        console.log('Please enter his or her employee id!')
        return false;
      },
    },
    {
      type: 'input',
      name: 'email',
      message: "What is his or her email?",
      validate: (value) => {
        if(value) {
          return true;
        }
        console.log('Please enter his or her email!')
        return false;
      },
    }
    ]).then(function({name, role, id, email}) {
        let info = '';
        if(role === "Engineer") {
            return info = 'Github username';
        }
        if(role === "Intern") {
            return info = 'school name';
        }
        inquirer.prompt([
            {
                message: `Please enter your new teammate's ${info}:`,
                name: 'info'
            },
            {
                type: 'list',
                name: 'addMore',
                message: 'Do you want to add more team members?',
                choices: ['yes', 'no']
            }]).then(function({info, addMore}) {
                    let newTeammate;
                    if(role = 'Engineer') {
                        newTeammate = new Engineer(name, id, email, info);
                    }
                    if(role = 'Intern') {
                        newTeammate = new Intern(name, id, email, info);
                    }
                    employees.push(newTeammate).then(function() {
                        if(addMore === 'yes') {
                            newTeammate();
                
                        }
                    });
                })
    })
};


checkPrivileges();