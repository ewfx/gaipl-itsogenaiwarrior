'use strict';

const mongoose = require('mongoose');

const { INCIDENT_STATUS } = require('./../enums/incidentStatus.enum');
const { TELEMETRY_STATUS } = require('./../enums/telemetryStatus.enum');
const { AUTOMATION_STATUS } = require('./../enums/automationStatus.enum');
const { AUTOMATION_TYPES } = require('./../enums/automationTypes.enum');

const incidentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    ciId: { type: mongoose.Schema.Types.ObjectId, ref: 'CI' },
    incidentDetails: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(INCIDENT_STATUS),
        default: INCIDENT_STATUS.OPEN,
    },

    telemetry: [
        {
            metricName: { type: String, required: true },
            value: { type: Number, required: true },
            timestamp: { type: Date, required: true },
            status: {
                type: String,
                enum: Object.values(TELEMETRY_STATUS),
                default: TELEMETRY_STATUS.HEALTHY,
            },
        },
    ],

    automations: [
        {
            automationType: {
                type: String,
                enum: Object.values(AUTOMATION_TYPES),
                required: true,
            },
            status: {
                type: String,
                enum: Object.values(AUTOMATION_STATUS),
                default: AUTOMATION_STATUS.PENDING,
            },
            logs: { type: String, default: '' },
            executedAt: { type: Date },
            duration: { type: Number },
        },
    ],

    rca: {
        resolutionSummary: { type: String },
        rootCause: { type: String },
        resolutionSteps: { type: String },
        resolvedAt: { type: Date },
    },

    // Audit fields
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Incident', incidentSchema);
