'use strict';

const mongoose = require('mongoose');

const { AUTOMATION_STATUS } = require('./../enums/automationStatus.enum');
const { AUTOMATION_TYPES } = require('./../enums/automationTypes.enum');

const automationLogSchema = new mongoose.Schema({
    incidentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Incident',
        required: true,
    },
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

    // Audit fields
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('AutomationLog', automationLogSchema);
