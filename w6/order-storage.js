const LOCAL_STORAGE_KEY = 'tshirt_orders_data';

export const saveOrders = function(orders) {
    try{ 
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
        console.log('Data Saved to localStorage successfully!');
    } catch (error) {
        console.error(`Error saving data to localStorage: ${error}`);
    };
};

// Generates a simple, unique ID for a new entry based on the current timestamp.
export const generateUniqueID = function() {
    return Date.now().toString();
}

export const loadOrders = function() {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString) {
            // If data exists, parse the JSON string back into a JavaScript array/object.
            return JSON.parse(dataString);
        }
        // If no data is found in localStorage, return an empty array.
        return [];

    } catch (err) {
        // In case of corrupted data, this should clear it to prevent continuous errors.
        console.error(`Error loading orders from localStorage: ${err}`);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
};