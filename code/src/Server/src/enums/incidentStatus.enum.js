'use strict';

// Using Object.freeze to ensure immutability for both the object and values array

const INCIDENT_STATUS = Object.freeze({
    OPEN: 'open',
    IN_PROGRESS: 'in-progress',
    RESOLVED: 'resolved',
});

// Directly export the values of the roles as a frozen array for clarity and performance
const INCIDENT_STATUS_TYPES = Object.freeze(Object.values(INCIDENT_STATUS));

module.exports = { INCIDENT_STATUS, INCIDENT_STATUS_TYPES };
