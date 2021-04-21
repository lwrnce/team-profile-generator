const { expect } = require("@jest/globals");
const Intern = require('../lib/Intern.js');

test('set school for employee', () => {
    const test = "UC Berkeley";
    const employee = new Intern('Dave', 1, 'test@test.com', test);
    expect(employee.school).toBe(test);
});

test('getRole() should return Intern', () => {
    const test = 'Intern';
    const employee = new Intern('Dave', 1, 'test@test.com', 'UC Berkeley');
    expect(employee.getRole()).toBe(test);
});

test('check if getSchool() retrieves school name', () => {
    const test = 'school';
    const employee = new Intern('Dave', 1, 'test@test.com', test);
    expect(employee.getSchool()).toBe(test);
})