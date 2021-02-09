
/**Unit tests for routes
 *      run tests like: 'npm test users.test.js'
 */

const {app, endConnection} = require('../index.js');
const supertest = require('supertest');
let request = supertest(app);

/*******************GET /users */

describe('GET /users', function() {
    it('responds with a list of users', async function() {
        const res = await request.get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(5);
    });
});

/********************POST /users */

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

/*************************GET /users/:id */

describe('GET /users/:id', function() {
    it('gets a user with given id', async function() {
        const res = await request.get('/users/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active" });
    });

    it('returns 404 for non-existent user', async function() {
        const res = await request.get('/users/100000');
        expect(res.statusCode).toEqual(404);
    });
});

/*************************PUT /users/:id */

describe('PUT /users/:id', function () {
    it('updates a user', async function () {

        const userData = { "id": 1, "email": "newEmail@email.com", "firstName": "Kyle", "lastName": "White", "state": "active" };
        const res = await request.put('/users/1').send(userData);
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual("newEmail@email.com");
    });

    it('responds 404 if user is not found', async function () {
        const userData = { "id": 15444, "email": "newEmail@email.com", "firstName": "Kyle", "lastName": "White", "state": "active" };
        const res = await request.put('/users/15444').send(userData);
        expect(res.statusCode).toEqual(404);
    });

    it("responds with error if params id and data id do not match", async function () {
        const userData = { "id": 1, "email": "newEmail@email.com", "firstName": "Kyle", "lastName": "White", "state": "active" };
        const res = await request.put('/users/2').send(userData);
        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toEqual('ID paramter does not match body');
    })
});

/***********************DELETE /users/:id */

describe('DELETE /users/:id', function () {
    it('deletes the given user', async function () {
        const res = await request.delete('/users/1');
        expect(res.statusCode).toEqual(204);
    });
});


afterAll(() => {
    endConnection();
});