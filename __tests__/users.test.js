
/**Testing for routes
 *      run tests like: 'jest users.test.js'
 */

const app = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('GET /users', function() {
    it('responds', async function(done) {
        const res = await request.get('/users');
        expect(res.statusCode).toEqual(200);
        done();
    });
})