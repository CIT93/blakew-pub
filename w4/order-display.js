// // Get references to the HTML elements where we will display the results.
const resultsContainer = document.getElementById('order-summary');

// Now, we use resultsContainer.querySelector() to get elements inside the resultsContainer.
const totalCostDisplay = resultsContainer.querySelector('#display-total');
const quantityDisplay = resultsContainer.querySelector('#display-qty');
const sizeDisplay = resultsContainer.querySelector('#display-size');
const giftWrapDisplay = resultsContainer.querySelector('#display-gift');

export const displayOrder = function(order) {
    totalCostDisplay.textContent = `${order.calculatedPrice}`;
    quantityDisplay.textContent = `${order.qty}`;
    sizeDisplay.textContent = `${order.size}`;
    giftWrapDisplay.textContent = `${order.giftWrap}`;

    // Make the entire results section visible
    resultsContainer.style.display = 'block';
};

// Hides the entire results section.
export const hideOrder = function() {
    resultsContainer.style.display = 'none';
}