'use strict';

const mongoose = require('mongoose');

const { CI_TYPES } = require('./../enums/ciTypes.enum');
const { TELEMETRY_STATUS } = require('./../enums/telemetryStatus.enum');

const ciSchema = new mongoose.Schema({
    ciName: { type: String, required: true },
    ciType: { type: String, enum: Object.values(CI_TYPES), required: true },
    status: {
        type: String,
        enum: Object.values(TELEMETRY_STATUS),
        default: TELEMETRY_STATUS.HEALTHY,
    },
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CI' }],

    // Audit fields
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CI', ciSchema);
