
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

afterAll(() => {
    endConnection();
});