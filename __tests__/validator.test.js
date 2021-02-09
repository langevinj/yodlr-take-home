/** Tests for the signup data validator
 *          run like: 'npm test validator.test.js'
 */
const { validateUserSignup, checkIfDuplicateEmail, checkIfNameInvalid } = require('../validator.js');
const axios = require('axios');
const { app, endConnection } = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);
jest.mock('axios');

axios.get.mockResolvedValue({
    data: [{ "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active" }]
});

/**********************checkIfDuplicateEmail */

describe('checkIfDuplicateEmail', function() {
    it('returns false if no other users with the email already exist', async function(){
        const res = await checkIfDuplicateEmail('neversignedup@test.com');
        expect(res).toBe(false);
    });

    it('returns true if an account exists with the email', async function() {
        const res = await checkIfDuplicateEmail('kyle@getyodlr.com');
        expect(res).toBe(true);
    })
});

/*********************checkIfNameInvalid */

describe("checkIfNameInvalid", function() {
    it("returns false if a name is valid", function() {
        expect(checkIfNameInvalid("John")).toBe(false);
        expect(checkIfNameInvalid("Smith")).toBe(false);
        expect(checkIfNameInvalid("Abdul-Jabbar")).toBe(false);
        expect(checkIfNameInvalid("Test Testy")).toBe(false);
        expect(checkIfNameInvalid("O'Brien")).toBe(false);
    });

    it("returns true for invalid names", function(){
        expect(checkIfNameInvalid("1111")).toBe(true);
        expect(checkIfNameInvalid("John@")).toBe(true);
        expect(checkIfNameInvalid("@@##")).toBe(true);
        expect(checkIfNameInvalid("John_Smith")).toBe(true);
    });
});

/***********************************validateUserSignup */

describe("validateUserSignup", function() {
    it("returns no errors with valid input", async function() {
        const signupData = {email: "validemail@email.com", firstName: "John", lastName: "Smith"};
        expect(await validateUserSignup(signupData)).toEqual([]);
    }); 

    it("returns an array of errors if any are present", async function(){
        const badAllData = {email: "kyle@getyodlr.com", firstName: "1122", lastName:"Smith@"};
        const badNameData = {email: "validemail@email.com", firstName: "111", lastName: "Smith"};

        expect(await validateUserSignup(badAllData)).toHaveLength(3);
        expect(await validateUserSignup(badNameData)).toHaveLength(1);
    });
});

afterAll(() => {
    endConnection();
});

