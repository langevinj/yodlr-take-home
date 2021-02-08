
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementsByName('email');

emailForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    console.log(emailInput);
});