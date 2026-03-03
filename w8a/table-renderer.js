// This module handles rendering the carbon footprint entries table.

const footprintTable = document.getElementById('footprintTable');
const footprintTableBody = footprintTable.querySelector('tbody');
const noEntriesMessage = document.getElementById('noEntriesMessage');

let _currentCallbacks = {};

let currentConfirmingRowElement = null;
let currentConfirmTimeoutId = null;

const clearAllDataButton = document.getElementById('clearAllDataButton');

const showDeleteConfirmingButtons = function(actionCell, id, onDeleteCallback) {
    const editButton = actionCell.querySelector('.action-button.edit');
    const deleteButton = actionCell.querySelector('.action-button.delete');
    if(editButton) editButton.style.display = 'none';
    if(deleteButton) deleteButton.style.display = 'none';

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm Delete';
    confirmBtn.classList.add('action-button', 'confirm');
    confirmBtn.dataset.id = id;

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.classList.add('action-button', 'cancel');
    cancelBtn.dataset.id = id;

    actionCell.appendChild(confirmBtn);
    actionCell.appendChild(cancelBtn);

    currentConfirmTimeoutId = setTimeout(function(){
        resetRowConfirmationState();
    }, 3000);

    confirmBtn.addEventListener('click', function(e){
        e.stopPropagation();
        onDeleteCallback(id);
        resetRowConfirmationState();
    });

    cancelBtn.addEventListener('click', function(e){
        e.stopImmediatePropagation();
        resetRowConfirmationState();
    });
};

const hideDeleteConfirmationButtons = function() {
    const editButton = currentConfirmingRowElement.querySelector('.action-button.edit');
    const deleteButton = currentConfirmingRowElement.querySelector('.action-button.delete');
    const confirmButton = currentConfirmingRowElement.querySelector('.action-button.confirm');
    const cancelButton = currentConfirmingRowElement.querySelector('.action-button.cancel');
    if(editButton) editButton.style.display = 'inline-block';
    if(deleteButton) deleteButton.style.display = 'inline-block';
    if(confirmButton) confirmButton.remove();
    if(cancelButton) cancelButton.remove();
};

export const resetRowConfirmationState = function() {
    if(currentConfirmingRowElement) {
        if(currentConfirmTimeoutId) {
            clearTimeout(currentConfirmTimeoutId);
            currentConfirmTimeoutId = null;
        }
        hideDeleteConfirmationButtons();
        currentConfirmingRowElement = null;
    }
};

const formatDateForDisplay = function(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

const formatHomeSizeDisplay = function(homeSquareFootage, isApartment){
    if(isApartment) return 'Apt.';
    return `${homeSquareFootage.toFixed(0)} sqft`;
};

const formatRadioValues = function(value) {
    switch(value) {
        case 'meatHeavy': return 'Meat-heavy';
        case 'average': return 'Average';
        case 'vegetarian': return 'Veg.';
        case 'vegan': return 'Vegan/Wild';
        case 'prepackaged': return 'Prepkg';
        case 'balanced': return 'Balanced';
        case 'fresh': return 'Fresh/Local';
        default: return value;
    }
};

const createTableRow = function(entry) {
    const row = document.createElement('tr');
    row.dataset.id = entry.id;

    row.innerHTML = `
        <td>${formatDateForDisplay(entry.timestamp)}</td>
        <td>${entry.householdMembers}</td>
        <td>${formatHomeSizeDisplay(entry.homeSquareFootage, entry.isApartment)}</td>
        <td>${formatRadioValues(entry.dietType)}</td>
        <td>${formatRadioValues(entry.foodPackaging)}</td>
        <td>${entry.totalFootprint}</td>
        <td class="action-cell">
            <button class="action-button edit" data-id="${entry.id}">Edit</button>
            <button class="action-button delete" data-id="${entry.id}">Delete</button>
        </td>
    `;

    return row;
};

export const renderTable = function(entries, callbacks) {
    _currentCallbacks = callbacks;

    footprintTableBody.innerHTML = '';

    if(entries.length === 0) {
        footprintTable.style.display = 'none';
        noEntriesMessage.style.display = 'block';
        clearAllDataButton.style.display = 'none';
        return;
    } else {
        footprintTable.style.display = 'table';
        noEntriesMessage.style.display = 'none';
        clearAllDataButton.style.display = 'block';
    }

    const sortedEntries = [...entries].sort(function(a, b){
        return new Date(b.timestamp) - new Date(a.timestamp);
    });

    for(const entry of sortedEntries) {
        const rowElement = createTableRow(entry);
        footprintTableBody.appendChild(rowElement);
    }
};

const handleTableClick = function (event) {
    const target = event.target;
    const id = target.dataset.id;
    const actionCell = target.closest('td');

    if(target.classList.contains('delete') && typeof _currentCallbacks.onDelete === 'function') {
        currentConfirmingRowElement = actionCell;
        showDeleteConfirmingButtons(actionCell, id, _currentCallbacks.onDelete);
    } else if (target.classList.contains('edit') && typeof _currentCallbacks.onEdit === 'function') {
        _currentCallbacks.onEdit(id);
    }
};

footprintTableBody.addEventListener('click', handleTableClick);