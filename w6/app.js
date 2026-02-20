// Module import for order-related helper functions
import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

// Reference to the main form element
const customOrderForm = document.getElementById('order-form');

// Get reference to Clear All Orders button
const clearAllOrdersButton = document.getElementById('clear-btn');

// Creating an array for orders and initializing it as empty.
const orders = [];

// State variables for in-line confirmation of "Clear All Data" button.
let isConfirmingClearAll = false; // Tracks if the button is in a "confirming" state.
let clearAllTimeoutId = null; // Stores the ID returned by setTimeout, so we can cancel it.

// Resets the "Clear All Data" button to its original text and appearance.
const resetClearAllButton = function() {
    // Clears any pending confirmation timeout.
    console.log(clearAllTimeoutId);
    if(clearAllTimeoutId) { 
        // If a timeout is active (meaning the button is in a confirming state), clear it.
        clearTimeout(clearAllTimeoutId);
    };
    // Reset the confirmation state
    isConfirmingClearAll = false;
    // Restore original button text and remove any special styling class.
    clearAllOrdersButton.textContent = 'Clear All Saved Orders';
    clearAllOrdersButton.classList.remove('danger-button');
    clearAllOrdersButton.classList.remove('confirm-state');
    // Re-add danger-button if it was removed (it's part of initial styling)
    clearAllOrdersButton.classList.add('danger-button');
};

// Resets all UI-related confirmation states across the application.
const resetAllUIStates = function() {
    // This function is called when major actions (like form submit, clear, delete) occur, ensuring a clean UI state.
    // Add to any function that updates DOM.
    // This will be expanded in later weeks to include table row confirmations
    resetClearAllButton();
}

// Handles form submission, prevents default behavior, and processes input values
const handleOrderSubmit = function(event) {
    event.preventDefault();
    const orderData = orderForm.getOrderInputs();
    const calculatedPrice = priceCalculator.calculateTotal(orderData);
    console.log(calculatedPrice);
    // Creating a newOrder object, then pushing the new object to the orders array.
    const newOrder = {
    ...orderData,
    ...calculatedPrice,
    id: orderStorage.generateUniqueID(),
    timestamp: new Date().toISOString()
    };
    orders.push(newOrder);
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders);
    console.log(orders);
    resetAllUIStates();
}

// New function to perform the actual clearing of all saved data.
const performClearAllOrders = function() {
    // Clear the in-memory array.
    // Setting length to 0 efficiently clears the array while keeping its const reference.
    orders.length = 0;
    console.log("In-memory array cleared:", orders);
    orderStorage.clearAllOrders();
    // Re-render table (will show "No entries")
    orderList.renderOrders(orders);
    resetAllUIStates();
};

// Handles the "Delete" action for a specific order.
// This will be implemented in Week 7.
const handleDeleteOrder = function(id) {
    console.log(`Delete button clicked for ID: ${id} functionality added in week 7`);

    resetAllUIStates();
}
// Handles the "Edit" button click for a specific order.
const handleEditOrder = function(id) {
    console.log(`Edit button clicked for ID: ${id} functionality added in week 7`);

    resetAllUIStates();
}

// Init function
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting an order!');
    // On startup, attempt to load any previously saved orders from localStorage.
    const loadedOrders = orderStorage.loadOrders();
    if(loadedOrders.length > 0) {
        orders.push(...loadedOrders);
        console.log('Orders loaded from localStorage');
        orderList.renderOrders(orders);
    };
    customOrderForm.addEventListener('submit', handleOrderSubmit);
    // init function - Event listener for "Clear All Data"
    clearAllOrdersButton.addEventListener('click', function(event){
        event.stopPropagation(); // Prevents this click from potentially triggering other global click listeners.
        if(isConfirmingClearAll) {
            // Second click: User confirms, so perform the action.
            performClearAllOrders();
        } else {
            // First click: Ask for confirmation by changing button text and state.
            isConfirmingClearAll = true;
            clearAllOrdersButton.textContent = 'Are you sure? Click again';
            // Add a class to change its appearance (defined in style.css).
            clearAllOrdersButton.classList.add('confirm-state');
            // Set a timeout to automatically revert the button state if the user doesn't click again.
            clearAllTimeoutId = setTimeout(function (){
                resetClearAllButton();
                console.log('Clear All confirmation timed out');
            }, 3000); // 3 seconds timeout
        };
    });

    // Global click listener to reset the "Clear All Data" button state if the user clicks anywhere else on the page while confirmation is pending.
    // Only reset if we are in a confirming state AND the click was outside the button itself.
    document.addEventListener('click', function(event){
        console.log(event.target);
        if(isConfirmingClearAll && event.target !== clearAllOrdersButton) {
            resetClearAllButton();
        }
    });
}

// Runs initialization once the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);