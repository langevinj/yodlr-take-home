const emailForm = document.getElementById('emailForm');
const BASE_URL = 'http://localhost:3000/users'

emailForm.addEventListener('submit', async function(evt) {
    evt.preventDefault();
    const emailInput = emailForm.elements[0].value;
    const firstName = emailForm.elements[1].value || "";
    const lastName = emailForm.elements[2].value || "";

    const params = { email: emailInput, firstName: firstName, lastName: lastName };
    const res = await axios.post(BASE_URL, params)
    console.log(res);
});