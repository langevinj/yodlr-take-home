const axios = require("axios");
const acceptalNameCharacters = "abcdefghijklmnopqrstuvwxyz- ".split("");

//Make sure there is not already a user with the email provided.
async function checkIfDuplicateEmail(email){
    const res = await axios.get('http://localhost:3000/users');
    const existingUsers = res.data;

    for(let user of existingUsers){
        if(user.email === email) return true
    }

    return false;
}

//Make sure that a name on contains valid characters.
function checkIfNameInvalid(name){
    for(let char of name.toLowercase()){
        if(!acceptalNameCharacters.includes(char)) return true;
    }

    return false;
}

//Go through each piece of data passed in signup. Determine validity, then create an error array.
async function validateUserSignup(signupData) {
    const errors = [];
    const emailInvalid = await checkIfDuplicateEmail(signupData.email);
    const firstNameInvalid = checkIfNameInvalid(signupData.firstName);
    const lastNameInvalid = checkIfNameInvalid(signupData.lastName);

    if(emailInvalid) errors.push("An account for this email already exists.");
    if(firstNameInvalid) errors.push("The first name you entered contains invalid characters.");
    if(lastNameInvalid) errors.push("The last name you entered contains invalid characters.");

    return errors
}


module.exports = { validateUserSignup, checkIfDuplicateEmail, checkIfNameInvalid };