
/**Testing for routes
 *      run tests like: 'npm test users.test.js'
 */

const {app, endConnection} = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);


describe('GET /users', function() {
    it('responds with a list of users', async function() {
        const res = await request.get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(5);
    });
});

describe('POST /users', function() {
    it('adds a new user', async function() {
        const newUserData = {email: "testuser@test.com", firstName: "Test", lastName: "User"}
        const res = await request.post('/users')
                    .send(newUserData)
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            id: expect.any(Number),
            email: "testuser@test.com",
            firstName: "Test",
            lastName: "User",
            state: expect.any(String)
        });
    });
});

describe('GET /users/:id', function() {
    it('gets a user with given id', async function() {
        const res = await request.get('/users/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active" });
    });

    it('returns 404 for non-existent user', async function() {
        try {
            const res = await request.get('/users/100000');
        } catch (err) {
            expect(err.statusCode).toEqual(404);
        }
    });
});

afterAll(() => {
    endConnection();
});