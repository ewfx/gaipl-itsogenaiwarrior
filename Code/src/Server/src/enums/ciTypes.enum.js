'use strict';

// Using Object.freeze to ensure immutability for both the object and values array

const CI_TYPES = Object.freeze({
    SERVER: 'server',
    DATABASE: 'database',
    SERVICE: 'service',
    NETWORK: 'network',
});

// Directly export the values of the roles as a frozen array for clarity and performance
const CI_TYPES_TYPES = Object.freeze(Object.values(CI_TYPES));

module.exports = { CI_TYPES, CI_TYPES_TYPES };
