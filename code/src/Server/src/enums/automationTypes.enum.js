'use strict';

// Using Object.freeze to ensure immutability for both the object and values array

const AUTOMATION_TYPES = Object.freeze({
    HEALTH_CHECK: 'health-check',
    REMEDIATION: 'remediation',
    DIAGNOSTICS: 'diagnostics',
});

// Directly export the values of the roles as a frozen array for clarity and performance
const AUTOMATION_TYPES_TYPES = Object.freeze(Object.values(AUTOMATION_TYPES));

module.exports = { AUTOMATION_TYPES, AUTOMATION_TYPES_TYPES };
