
const BASE_URL = 'http://localhost:3000/users';

function listUsers(users) {

}

window.addEventListener('load', async function(){
    const users = await axios.get(BASE_URL);
    console.log(users);
});