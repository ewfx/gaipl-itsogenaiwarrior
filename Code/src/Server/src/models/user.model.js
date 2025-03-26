'use strict';

const mongoose = require('mongoose');
const { USER_ROLES } = require('./../enums/userRoles.enum');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.SUPPORT,
    },

    // Audit fields
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
