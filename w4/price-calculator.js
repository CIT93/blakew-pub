const shirtPrice = 15;
const giftWrapPrice = 2;

export const calculateTotal = function(orderData) {
    const {qty, giftWrap} = orderData;
    let totalOrderPrice = qty * shirtPrice;
    if(giftWrap) totalOrderPrice += giftWrapPrice;
    return {calculatedPrice: totalOrderPrice};
};

  