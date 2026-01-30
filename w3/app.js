// Module import for order-related helper functions
import * as orderForm from "./order-handler.js";

// Reference to the main form element
const customOrderForm = document.getElementById('order-form');

// Reference to order-summary div
const orderSummary = document.getElementById('order-summary');

// Reference to gift wrap input for output message purposes
const giftWrapInput = customOrderForm.querySelector('#gift-wrap');

// Handles form submission, prevents default behavior, and processes input values
const handleOrderSubmit = function(event) {
    event.preventDefault();
    const orderData = orderForm.getOrderInputs();
    let message = `Ordered ${orderData.qty} ${orderData.size} T-Shirt(s)`;
    console.log(`Form Inputs - Object Literal:`);
    console.log(`key of qty value of ${orderData.qty}`);
    console.log(`key of size value of ${orderData.size}`);
    console.log(`key of giftWrap value of ${orderData.giftWrap}`);
    console.log(orderData);
    if(giftWrapInput.checked) {
        message = `Ordered ${orderData.qty} ${orderData.size} T-Shirt(s) with gift wrap`;
        console.log(`Order for ${orderData.qty} ${orderData.size} T-Shirt(s) with gift wrap placed`);
    } else {
        console.log(`Order for ${orderData.qty} ${orderData.size} T-Shirt(s) placed`);
    }
    orderSummary.textContent = message;
}

// Init function
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting an order!');
    customOrderForm.addEventListener('submit', handleOrderSubmit);
}

// Runs initialization once the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);