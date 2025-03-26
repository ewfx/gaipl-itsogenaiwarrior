'use strict';

// Using Object.freeze to ensure immutability for both the object and values array

const AUTOMATION_STATUS = Object.freeze({
    PENDING: 'pending',
    RUNNING: 'running',
    COMPLETED: 'completed',
    FAILED: 'failed',
});

// Directly export the values of the roles as a frozen array for clarity and performance
const AUTOMATION_STATUS_TYPES = Object.freeze(Object.values(AUTOMATION_STATUS));

module.exports = { AUTOMATION_STATUS, AUTOMATION_STATUS_TYPES };
