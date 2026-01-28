console.log('Hello from app.js! Your JavaScript is connected and running!');
// --- Part 3: Implement the form-handler.js module ---
// The path './form-handler.js' tells JavaScript where to find the module file.`
import * as formHandler from './form-handler.js';


// --- Part 1: Function, EventListener and References ---

// We get references to the HTML elements our JavaScript needs to interact with.
// We use 'const' because these references themselves won't change, even if their content does.
// Get a reference to the main form element by its ID.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Using form.querySelector() is good practice for elements inside a specific parent (our form).
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Get a reference to the 'Clear Form' button.
const clearFormButton = document.getElementById('clearFormButton');

// --- Part 2: Code handleFormSubmit and handleClearForm Functions ---

// Handles the Form submission event.
// @param {Event} event - The event object provided by the browser.
const handleFormSubmit = function(event) {
    // IMPORTANT: event.preventDefault()
    // This stops the browser's default behavior of reloading the page when a form is submitted.
    event.preventDefault();
    console.log(event);
    formHandler.getFormInputs();
    // The '.value' property always returns a string.
    // parseInt() converts that string into a whole number.
    // The '|| 1' is a safety net: if the input is empty or invalid, it defaults to 1.
    const householdMembers = parseInt(householdMembersInput.value) || 1;
    // console.log(typeof householdMembers)
    // Log the collected data to the console.
    console.log(`Form submitted with household members of ${householdMembers}`);
}

// Handles the Clear Form button.
const handleClearForm = function() {
    // call clearForm function from formHandler module
    formHandler.clearForm();
    // The form.reset() method is a built-in browser function that resets all form fields
    // back to their initial values as defined in the HTML.
    carbonFootprintForm.reset();
    // Manually ensure the default value for 'householdMembers' is 1.
    householdMembersInput.value = 1;
    console.log('Clear button clicked');
}

// The main initialization function for our application.
// This function sets up all the event listeners.
// The 'DOMContentLoaded' event is crucial!
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.')
    
    // Attach the 'submit' event listener to our main form.
    // When the form is submitted, the 'handleFormSubmit' function will be called.
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);

    // Attach the 'click' event listener to our "Clear Form" button.
    // When the button is clicked, the 'handleClearForm' function will be called.
    clearFormButton.addEventListener('click', handleClearForm);
};

document.addEventListener('DOMContentLoaded', init);