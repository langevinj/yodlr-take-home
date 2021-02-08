
const BASE_URL = 'http://localhost:3000/users';
const usersTableBody = document.getElementsByTagName('tbody')[0];

//Create a table entry for a user, then append it to the DOM.
function addUserToTable(user) {
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

   const cols = [idCol, firstNameCol, lastNameCol, emailCol];
   userRow.append(...cols);

   usersTableBody.append(userRow);
   return userRow;
}

window.addEventListener('load', async function(){
    const res = await axios.get(BASE_URL);
    const users = res.data;
    for(let user of users){
        addUserToTable(user);
    }
});

modules.exports = addUserToTable;