// Module import for order-related helper functions
import * as orderForm from "./order-handler.js";
import * as priceCalculator from "./price-calculator.js";
import * as orderStorage from './order-storage.js';
import * as orderList from './order-list.js';

// Reference to the main form element
const customOrderForm = document.getElementById('order-form');

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
    id: orderStorage.generateUniqueID(),
    timestamp: new Date().toISOString()
    };
    orders.push(newOrder);
    orderStorage.saveOrders(orders);
    orderList.renderOrders(orders);
    console.log(orders);
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
}

// Runs initialization once the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', init);