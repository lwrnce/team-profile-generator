const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        // super keyword accesses and calls functions in object's parent
        super(name, id, email);
        this.github = github;
    }

    getGitHub() {
        return this.github;
    }
// this will override the Employee and return Engineer
    getRole() {
        return "Engineer";
    }
};

module.exports = Engineer;