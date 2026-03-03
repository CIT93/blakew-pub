console.log('Hello from app.js! Your JavaScript is connected and running!');

import * as formHandler from './form-handler.js';
import * as calculator from './calculator.js';
import * as resultsDisplay from './results-display.js';
import * as storage from './storage.js';
import * as tableRenderer from './table-renderer.js';

const carbonFootprintEntries = []; 

const carbonFootprintForm = document.getElementById('carbonFootprintForm');
const clearFormButton = document.getElementById('clearFormButton');
const clearAllDataButton = document.getElementById('clearAllDataButton');

let isConfirmingClearAll = false;
let clearAllTimeoutId = null;

const resetClearAllButton = function() {
    if(clearAllTimeoutId) { 
        clearTimeout(clearAllTimeoutId);
    };
    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('danger-button');
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
};

const resetAllUIStates = function() {
    resetClearAllButton();
};

const handleFormSubmit = function (event) {
    event.preventDefault();

    const formData = formHandler.getFormInputs();
    const calculatedResults = calculator.calculateFootprint(formData);

    const newEntry = {
        ...formData,
        ...calculatedResults,
        id: storage.generateUniqueId(),
        timestamp: new Date().toISOString()
    };

    carbonFootprintEntries.push(newEntry);

    storage.saveEntries(carbonFootprintEntries);

    resultsDisplay.displayResults(calculatedResults);

    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });

    resetAllUIStates();
};

const handleDeleteEntry = function(id) {
    const indexToDelete = carbonFootprintEntries.findIndex(function(entry){
        return entry.id === id;
    });

    if(indexToDelete !== -1) {
        carbonFootprintEntries.splice(indexToDelete, 1);
        storage.saveEntries(carbonFootprintEntries);
        tableRenderer.renderTable(carbonFootprintEntries, {
            onDelete: handleDeleteEntry,
            onEdit: handleEditEntry
        });
        resetAllUIStates();
    }
};

const handleEditEntry = function(id) {
    console.log(`Edit button clicked for ID: ${id}`);
    resetAllUIStates();
};

const init = function () {
    carbonFootprintForm.addEventListener('submit', handleFormSubmit);
    clearFormButton.addEventListener('click', formHandler.clearForm);

    resultsDisplay.hideResults();

    const loadedEntries = storage.loadEntries();
    if(loadedEntries.length > 0) {
        carbonFootprintEntries.push(...loadedEntries);
    }

    tableRenderer.renderTable(carbonFootprintEntries, {
        onDelete: handleDeleteEntry,
        onEdit: handleEditEntry
    });
};

document.addEventListener('DOMContentLoaded', init);