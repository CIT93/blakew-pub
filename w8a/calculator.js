// Calculates points for Household Size based on WikiHow Method 1.
// @param {number} householdMembers - Number of people in the household.

const calculatedHouseholdPoints = function(householdMembers) {
    if(householdMembers === 1) return 14;
    else if(householdMembers === 2) return 12;
    else if(householdMembers === 3) return 10;
    else if(householdMembers === 4) return 8;
    else if(householdMembers === 5) return 6;
    else if(householdMembers > 5) return 4;
    return 0;
};

// Calculates points for Home Size based on WikiHow Method 1
// @param {number} homeSquareFootage - Square footage of the home.
// @param {boolean} isApartment - True if dwelling is an apartment.
// @returns {number} Points for home size.
const calculateHomeSizePoints = function(homeSquareFootage, isApartment) {
    if(isApartment) return 2;
    else if(homeSquareFootage > 2000) return 10;
    else if(homeSquareFootage >= 1000) return 7;
    else if(homeSquareFootage > 0) return 4;
    return 0;
};

// @param {string} dietType - Type of diet ('meatHeavy', 'average', 'vegetarian', 'vegan')
// @returns {number} Points for diet type.
const calculateFoodDietPoints = function(dietType) {
    switch(dietType) {
        case 'meatHeavy': return 10;
        case 'average': return 8;
        case 'vegetarian': return 4;
        case 'vegan': return 2;
        default: return 0;
    };
};

// Calculates points for Food Packaging based on WikiHow Method 1.
// @param {string} foodPackaging - Type of food packaging ('prepackaged', 'balanced', 'fresh').
// @returns {number} Points for food packaging.
const calculateFoodPackagingPoints = function(foodPackaging) {
    switch(foodPackaging) {
        case 'prepackaged': return 12;
        case 'balanced': return 6;
        case 'fresh': return 2;
        default: return 0;
    };
};

export const calculateFootprint = function(data) { 
    const householdPoints = calculatedHouseholdPoints(data.householdMembers);
    const homeSizePoints = calculateHomeSizePoints(data.homeSquareFootage, data.isApartment);
    const dietTypePoints = calculateFoodDietPoints(data.dietType);
    const foodPackagingPoints = calculateFoodPackagingPoints(data.foodPackaging);

    const totalFootprintPoints =
        householdPoints +
        homeSizePoints +
        dietTypePoints +
        foodPackagingPoints;

    return {
        totalFootprint: totalFootprintPoints,
        householdFootprint: householdPoints,
        homeSizeFootprint: homeSizePoints,
        dietTypeFootprint: dietTypePoints,
        foodPackagingFootprint: foodPackagingPoints
    };
};