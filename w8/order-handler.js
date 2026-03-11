// Reference to the main form element
const customOrderForm = document.getElementById('order-form');

// Reference to the quantity input inside the form
const quantityInput = customOrderForm.querySelector('#qty');

// Size radio buttons reference
const sizeRadios = customOrderForm.querySelectorAll('input[name="size"]');

// Gift Wrap Checkbox reference
const giftWrapInput = customOrderForm.querySelector('#gift-wrap');

// Function to figure out which Size radio button is checked
const getSelectedRadioValue = function(radioButtons) {
    for(const radio of radioButtons) {
        if(radio.checked) {
            console.log(`${radio.value} has the attribute of ${radio.checked}`);
            return radio.value;
        };
    };
};

// Export and define main function
export const getOrderInputs = function() {
    console.log('Get Order Inputs');
    return {
        qty: parseInt(quantityInput.value) || 1,
        size: getSelectedRadioValue(sizeRadios),
        giftWrap: giftWrapInput.checked 
    };
};
