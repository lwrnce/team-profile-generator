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
});

test('set id for employee', () => {
    const test = 123;
    const employee = new Employee('Dave', test);
    expect(employee.id).toBe(test);
});

test('set email for employee', () => {
    const test = 'test@test.com';
    const employee = new Employee('Dave', 1, test);
    expect(employee.email).toBe(test);
});

test('check if name is retrievable with getName()', () => {
    const test = 'Dave';
    const employee = new Employee(test);
    expect(employee.getName()).toBe(test);
});

test('check if id is retrievable with getId()', () => {
    const test = 123;
    const employee = new Employee('Dave', test);
    expect(employee.getId()).toBe(test);
});

test('check if email is retrievable with getEmail()', () => {
    const test = 'test@test.com';
    const employee = new Employee('Dave', 1 , test);
    expect(employee.getEmail()).toBe(test);
});

test('check if getRole() returns Employee', () => {
    const test = 'Employee';
    const employee = new Employee('Dave', 1, 'test@test.com');
    expect(employee.getRole()).toBe(test);
});

