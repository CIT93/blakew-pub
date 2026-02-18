// Module import for order-related helper functions
import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as orderDisplay from "./order-display.js";
import * as orderStorage from './order-storage.js';

// Reference to the main form element
const customOrderForm = document.getElementById('order-form');

// Reference to order-summary div
const orderSummary = document.getElementById('order-summary');

// Reference to gift wrap input for output message purposes
const giftWrapInput = customOrderForm.querySelector('#gift-wrap');

// Creating an array for orders and initializing it as empty.
const orders = [];

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
    timestamp: new Date().toISOString()
    };
    orders.push(newOrder);
    console.log(orders);
    orderDisplay.displayOrder(newOrder);
}

// Init function
const init = function () {
    console.log('App initialized: DOM is ready! Try submitting an order!');
    // On startup, attempt to load any previously saved orders from localStorage.
        const loadedOrders = orderStorage.loadOrders();
        if(loadedOrders.length > 0) {
            orders.push(...loadedOrders);
            console.log('Orders loaded from localStorage');
        } else {
            console.log('No orders found in localStorage. Starting fresh');
        }
    customOrderForm.addEventListener('submit', handleOrderSubmit);
    orderDisplay.hideOrder();
}

// Runs initialization once the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);