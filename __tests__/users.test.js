
/**Testing for routes
 *      run tests like: 'npm test users.test.js'
 */

const {app, endConnection} = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);


describe('GET /users', function() {
    it('responds with a list of users', async function(done) {
        const res = await request.get('/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(5);
        done();
    });
});

describe('POST /users', function() {
    it('adds a new user', async function(done) {
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
        done();
    });
});

afterAll(() => {
    endConnection();
});