const { expect } = require("@jest/globals");
const Employee = require("../lib/Employee");

test('creates an employee object', () => {
    const employee = new Employee();
    expect(typeof(employee)).toBe("object");
});

test('set name for employee', () => {
    const name = 'Dave';
    const employee = new Employee(name);
    expect(employee.name).toBe(name);
})