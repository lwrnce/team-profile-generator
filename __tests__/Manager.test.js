const { expect } = require("@jest/globals");
const Manager = require('../lib/Manager.js');

test('set office number for manager', () => {
    const test = 123;
    const employee = new Manager('Dave', 1, 'test@test.com', test);
    expect(employee.office).toBe(test);
});

test('getRole() should return Manager', () => {
    const test = 'Manager';
    const employee = new Manager('Dave', 1, 'test@test.com', 123);
    expect(employee.getRole()).toBe(test);
});

test('check if getOffice() retrieves office number', () => {
    const test = 123;
    const employee = new Manager('Dave', 1, 'test@test.com', test);
    expect(employee.getOffice()).toBe(test);
});