'use strict';

// Using Object.freeze to ensure immutability for both the object and values array
const USER_ROLES = Object.freeze({
    ADMIN: 'admin',
    SUPPORT: 'support',
    USER: 'user',
});

// Directly export the values of the roles as a frozen array for clarity and performance
const USER_ROLE_TYPES = Object.freeze(Object.values(USER_ROLES));

module.exports = { USER_ROLES, USER_ROLE_TYPES };
