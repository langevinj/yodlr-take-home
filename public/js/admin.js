
const BASE_URL = 'http://localhost:3000/users';
const usersTableBody = document.getElementsByTagName('tbody')[0];

//Create a table entry for a user, then append it to the DOM.
function createUserRow(user) {
   const userRow = document.createElement('tr');
   userRow.id = user.id;
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
   const stateButton = document.createElement('button');
   stateButton.innerHTML = user.state;
   stateButton.className = user.state === 'active' ? 'btn btn-success rounded state-button' : 'btn btn-warning rounded state-button';
   stateCol.append(stateButton);

   const cols = [idCol, firstNameCol, lastNameCol, emailCol, stateCol];
   userRow.append(...cols);

   return userRow;
}

//Add a button for changing the user state to each user's row.
function addButtonListeners(){
    const stateButtons = document.querySelectorAll('.state-button');

    stateButtons.forEach(btn => btn.addEventListener('click', async function () {
        const userId = btn.parentNode.parentNode.id;

        //Get the user related to the button clicked.
        const res = await axios.get(`${BASE_URL}/${userId}`);
        const user = res.data;

        //Toggle between the states, updating backend as well;
        if (btn.className.includes('warning')) {
            btn.className = 'btn btn-success rounded state-button';
            btn.innerHTML = 'active';
            await axios.put(`/users/${userId}`, { ...user, state: "active"});
        } else {
            btn.className = 'btn btn-warning rounded state-button';
            btn.innerHTML = 'pending';
            await axios.put(`/users/${userId}`, { ...user, state: "pending"});
        }
    }));
}

window.addEventListener('load', async function(){
    const res = await axios.get(BASE_URL);
    const users = res.data;
    for(let user of users){
        const row = createUserRow(user);
        usersTableBody.append(row);
    }
    addButtonListeners();
});

module.exports = createUserRow;