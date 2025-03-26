'use strict';

const joi = require('./../../helpers/joi.helper');
const { USER_ROLE_TYPES } = require('./../../enums/userRoles.enum');

exports.getIncidents = dataObj => {
    const schema = joi.object({});

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};
exports.getAISuggestion = dataObj => {
    const schema = joi.object({
        incidentId: joi.string().required(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.createAIChat = dataObj => {
    const schema = joi.object({
        message: joi.string().required(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.createUserSchema = dataObj => {
    const schema = joi.object({
        userName: joi.string().required(),
        role: joi
            .string()
            .valid(...USER_ROLE_TYPES)
            .required(),
        email: joi.string().email().required(),
        password: joi.string().password().required(),
        firstName: joi.string().name().required(),
        lastName: joi.string().name().required(),
        phoneNumber: joi.string().phoneNumber().required(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.getUserByIdSchema = dataObj => {
    const schema = joi.object({
        userId: joi.string().uuid().required(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.updateUserById = dataObj => {
    const schema = joi.object({
        userId: joi.string().uuid().required(),
        userName: joi.string().optional(),
        role: joi.string().valid(...USER_ROLE_TYPES),
        email: joi.string().email().optional(),
        password: joi.string().password().optional(),
        firstName: joi.string().name().optional(),
        lastName: joi.string().name().optional(),
        phoneNumber: joi.string().phoneNumber().optional(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.deleteUserById = dataObj => {
    const schema = joi.object({
        userId: joi.string().uuid().required(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.getUserInfoByIdSchema = dataObj => {
    const schema = joi.object({
        userId: joi.string().uuid().required(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.updateUserInfoById = dataObj => {
    const schema = joi.object({
        userId: joi.string().uuid().required(),
        firstName: joi.string().name().optional(),
        lastName: joi.string().name().optional(),
        phoneNumber: joi.string().phoneNumber().optional(),
        address: joi.string().optional(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};

exports.changeUserPassword = dataObj => {
    const schema = joi.object({
        currentPassword: joi.string().password().required(),
        newPassword: joi.string().password().required(),
    });

    return schema.validate(dataObj, {
        stripUnknown: true,
        abortEarly: false,
    });
};
