console.log('Hello from app.js! Your JavaScript is connected and running!');

// Module import for form-related helper functions
import * as formHandler from './form-handler.js';

// Reference to the main carbon footprint form element
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Reference to the household members input inside the form
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Reference to the button used to clear the form
const clearFormButton = document.getElementById('clearFormButton');

// Handles form submission, prevents default behavior, and processes input values
const handleFormSubmit = function (event) {
    event.preventDefault();
    console.log(event);
    formHandler.getFormInputs();
    const householdMembers = parseInt(householdMembersInput.value) || 1;
    console.log(`Form submitted with household members of ${householdMembers}`);
};

// Clears form data and resets inputs to default values
const handleClearForm = function () {
    formHandler.clearForm();
    carbonFootprintForm.reset();
    householdMembersInput.value = 1;
    console.log('Clear button clicked');
};

// Initializes the application and attaches required event listeners
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', handleClearForm);
};

// Runs initialization once the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);