const emailForm = document.getElementById('emailForm');
const formBox = document.getElementById('form-box');
const BASE_URL = 'http://localhost:3000/users'

//Create alert messages for each error and append them to the form box.
function alertErrors(errors){
    for(let error of errors){
        let errorAlert = document.createElement('div');
        errorAlert.className = 'alert alert-danger';
        errorAlert.setAttribute('role', 'alert');
        errorAlert.innerHTML = error;
        formBox.append(errorAlert);
    }
}

emailForm.addEventListener('submit', async function(evt) {
    evt.preventDefault();
    const emailInput = emailForm.elements[0].value;
    const firstName = emailForm.elements[1].value || "";
    const lastName = emailForm.elements[2].value || "";

    const params = { email: emailInput, firstName: firstName, lastName: lastName };
    const res = await axios.post(BASE_URL, params);

    if(res.data.errors){
        alertErrors(res.data.errors);
    } else {
        emailForm.reset();
    }
});