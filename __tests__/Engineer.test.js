const { expect } = require("@jest/globals");
const Engineer = require('../lib/Engineer.js');

test('set GitHub account for employee', () => {
    const test = "Git";
    const employee = new Engineer('Dave', 1, 'test@test.com', test);
    expect(employee.github).toBe(test);
});

test('getRole() should return Engineer', () => {
    const test = 'Engineer';
    const employee = new Engineer('Dave', 1, 'test@test.com', 'Git');
    expect(employee.getRole()).toBe(test);
});

test('check if getGitHub() retrieves GitHub username', () => {
    const test = 'Git';
    const employee = new Engineer('Dave', 1, 'test@test.com', test);
    expect(employee.getGitHub()).toBe(test);
})