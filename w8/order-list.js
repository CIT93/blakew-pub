let moduleCallbacks = {};

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
            <button class="action-button edit-btn" data-id="${order.id}">Edit</button>
            <button class="action-button delete-btn" data-id="${order.id}">Delete</button>
        </td>
    `;
    return row;
};

orderTableBody.addEventListener('click', function(event) {
    const target = event.target;
    
    // 1. Get the ID from the button that was clicked
    const id = target.dataset.id;

    // 2. Guard Clause: If they clicked a row (white space) but NOT a button, 
    // there will be no ID. So we stop the function immediately.
    if (!id) return;

    if(target.classList.contains('delete-btn') && typeof moduleCallbacks.onDelete === 'function') {
        moduleCallbacks.onDelete(id);
    } else if (target.classList.contains('edit-btn') && typeof moduleCallbacks.onEdit === 'function') {
        moduleCallbacks.onEdit(id);
    }
});

export const renderOrders = function(orders, callbacks) {
    moduleCallbacks = callbacks;
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