const inquirer = require('inquirer');
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const { createDecipher } = require('crypto');

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
          info = 'Github username';
        }
        if(role === "Intern") {
          info = 'school name';
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
                    employees.push(newTeammate)
                    newHTML(newTeammate).then(function() {
                        if(addMore === 'yes') {
                            newTeammate();
                        }
                        if(addMore === 'no') {
                          exitApp();
                        }
                    });
                });
    });
};

function generateHTML() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
      <link rel="stylesheet" href="./assets/css/styles.css">
      <title>Team Profile</title>
  </head>
  <body>
      <div class="container-fluid text-center">
          <div class="row">
              <div class="col">
                  <div class="page-title">
                      <h2>Your Team</h2>
                  </div>
              </div>
          </div>
          <div class="row">`;
          fs.writeFile('./dist/team-output.html', html, function(err) {
            if (err) {
              console.log(err);
            }
          });
};

function newHTML(teammate) {
  return new Promise(function(resolve, reject) {
    const name = teammate.getName();
    const role = teammate.getRole();
    const id = teammate.getId();
    const email = teammate.getEmail();
    let data = '';

    if (role === 'Manager') {
      const office = teammate.getOffice();
      return data = `
      <div class="col-lg-4 col-sm-12">
          <div class="card" style="width: 18rem;">
              <img src="./assets/images/manager.jpg" class="card-img-top" alt="manager">
              <div class="card-body">
                  <h4 class="card-title">${name}</h5>
                  <p class="card-text">Role: Manager</p>
                  <p class="card-text">ID:${id}</p>
                  <p class="card-text">Email:${email}</p>
                  <p class="card-text">Office Number:${office}</p>
              </div>
          </div>
      </div>`;
    }
    if (role === 'Engineer') {
      const github = teammate.getGitHub();
      return data = `
      <div class="col-lg-4 col-sm-12">
          <div class="card" style="width: 18rem;">
              <img src="./assets/images/engineer.jpg" class="card-img-top" alt="engineer">
              <div class="card-body">
                  <h4 class="card-title">${name}</h5>
                  <p class="card-text">Role: Engineer</p>
                  <p class="card-text">ID:${id}</p>
                  <p class="card-text">Email:${email}</p>
                  <p class="card-text">GitHub:${github}</p>
              </div>
          </div>
      </div>`;
    }
    if (role === 'Intern') {
      const school = teammate.getSchool();
      return data = `
      <div class="col-lg-4 col-sm-12">
          <div class="card" style="width: 18rem;">
              <img src="./assets/images/intern.jpg" class="card-img-top" alt="intern">
              <div class="card-body">
                  <h4 class="card-title">${name}</h5>
                  <p class="card-text">Role: Intern</p>
                  <p class="card-text">ID:${id}</p>
                  <p class="card-text">Email:${email}</p>
                  <p class="card-text">School:${school}</p>
              </div>
          </div>
      </div>`;
    }
    fs.appendFile('./dist/team-output.html', data, function(err) {
      if(err) {
        return reject(err);
      };
      return resolve();
    })
  }
)};

checkPrivileges();