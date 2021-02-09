
const BASE_URL = 'http://localhost:3000/users';
const usersTableBody = document.getElementsByTagName('tbody')[0];

//Create a table entry for a user, then append it to the DOM.
function createUserRow(user) {
   const userRow = document.createElement('tr');
   const idCol = document.createElement('th');
   idCol.innerHTML = user.id;
   let scope = document.createAttribute('scope');
   scope.value = "row";
   idCol.setAttributeNode(scope);

   const firstNameCol = document.createElement('td');
   firstNameCol.innerHTML = user.firstName || "";

   const lastNameCol = document.createElement('td');
   lastNameCol.innerHTML = user.lastName || "";

   const emailCol = document.createElement('td');
   emailCol.innerHTML = user.email;

   const stateCol = document.createElement('td');
   stateCol.innerHTML = user.state;

   const cols = [idCol, firstNameCol, lastNameCol, emailCol, stateCol];
   userRow.append(...cols);

   return userRow;
}

window.addEventListener('load', async function(){
    const res = await axios.get(BASE_URL);
    const users = res.data;
    for(let user of users){
        const row = createUserRow(user);
        usersTableBody.append(row);
    }
});

module.exports = createUserRow;