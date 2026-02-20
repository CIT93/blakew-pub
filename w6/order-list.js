const orderTableBody = document.getElementById('order-table-body');

// Formats a timestamp into a local date string.
const formatDateForDisplay = function(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

// Creates and returns a single table row () element for a given order.
// @returns {HTMLElement} The created DOM element.
const createTableRow = function(order) {
    const row = document.createElement('tr');
    // Store the order's unique ID directly on the row using a data-id attribute.
    row.dataset.id = order.id;
    // Set the inner HTML of the row using a template literal.
    row.innerHTML = `
        <td>${formatDateForDisplay(order.timestamp)}</td>
        <td>${order.qty}</td>
        <td>${order.size}</td>
        <td>${order.calculatedPrice}</td>
        <td class="action-cell">
            <button class="action-button edit" data-id="${order.id}">Edit</button>
            <button class="action-button delete" data-id="${order.id}">Delete</button>
        </td>
    `;
    return row;
};

export const renderOrders = function(orders) {
    // Loop through each sorted entry and create a table row for it.
    // Clear any existing rows in the table body to avoid duplicates on re-render.
    orderTableBody.innerHTML = '';
    // Sorts the array by timestamp in descending order (newest first)
    const sortedOrders = [...orders].sort(function(a, b){
        return new Date(b.timestamp) - new Date(a.timestamp)
    });

    for(const order of sortedOrders) {
        console.log(`${order}`)
        // Call our helper function to build the row
        const rowElement = createTableRow(order);
        orderTableBody.appendChild(rowElement);
    };
};