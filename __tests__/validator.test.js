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

afterAll(() => {
    endConnection();
});



