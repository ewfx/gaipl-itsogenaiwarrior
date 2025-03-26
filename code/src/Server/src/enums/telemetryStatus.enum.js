'use strict';

// Using Object.freeze to ensure immutability for both the object and values array
const TELEMETRY_STATUS = Object.freeze({
    HEALTHY: 'healthy',
    WARNING: 'warning',
    CRITICAL: 'critical',
});

// Directly export the values of the roles as a frozen array for clarity and performance
const TELEMETRY_STATUS_TYPES = Object.freeze(Object.values(TELEMETRY_STATUS));

module.exports = { TELEMETRY_STATUS, TELEMETRY_STATUS_TYPES };
