const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, office){
        super(name, id, email);
        this.office = office;
    }

    getOffice() {
        return this.office;
    }
// this will override Employee and return Manager
    getRole() {
        return "Manager";
    }
}


module.exports = Manager;