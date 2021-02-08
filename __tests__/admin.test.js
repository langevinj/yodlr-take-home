
/**Unit test for admin.js functions
 *      run like: 'npm test admin.test.js
 */

const createUserRow = require('../public/js/admin.js');

describe("createUserRow", function() {
    it("creates an HTML table row element containing user data", function() {
        const userData = { "id": 1, "email": "kyle@getyodlr.com", "firstName": "Kyle", "lastName": "White", "state": "active" };
        const testTableRow = createUserRow(userData);
        expect(testTableRow.outerHTML).toEqual(`<tr><th scope="row">${userData.id}</th><td>${userData.firstName}</td><td>${userData.lastName}</td><td>${userData.email}</td></tr>`)
    });
});