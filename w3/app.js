console.log('Hello from app.js! Your JavaScript is connected and running!');
// --- Part 1: Function, EventListener and References ---

// We get references to the HTML elements our JavaScript needs to interact with.
// We use 'const' because these references themselves won't change, even if their content does.
// Get a reference to the main form element by its ID.
const carbonFootprintForm = document.getElementById('carbonFootprintForm');

// Using form.querySelector() is good practice for elements inside a specific parent (our form).
const householdMembersInput = carbonFootprintForm.querySelector('#householdMembers');

// Get a reference to the 'Clear Form' button.
const clearFormButton = document.getElementById('clearFormButton');

// Handles the Form submission event.
const handleFormSubmit = function() {
    console.log('Form submitted');
}

// Handles the Clear Form button.
const handleClearForm = function() {
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