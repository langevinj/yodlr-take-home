

const emailForm = document.getElementById('emailForm');

emailForm.addEventListener('submit', async function(evt) {
    evt.preventDefault();
    const emailInput = emailForm.elements[0].value;
    console.log(emailInput);
});