'use strict';

const incidentService = require('./incidents.service');
const incidentSchema = require('./incidents.schema');

exports.getIncidents = async (req, res, next) => {
    try {
        const dataObj = req.query;
        const validation = incidentSchema.getIncidents(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const validatedData = validation.value || {};
        const data = await incidentService.getIncidents(validatedData);
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.getAISuggestion = async (req, res, next) => {
    try {
        const dataObj = req.query;
        dataObj.incidentId = req.params.incidentId;
        const validation = incidentSchema.getAISuggestion(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const validatedData = validation.value || {};
        const data = await incidentService.getAISuggestion(validatedData);
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};
exports.createAIChat = async (req, res, next) => {
    try {
        const dataObj = req.query;
        const validation = incidentSchema.createAIChat(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const validatedData = validation.value || {};
        const data = await incidentService.createAIChat(validatedData);
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};
exports.createUser = async (req, res, next) => {
    try {
        const dataObj = req.body;
        const validation = incidentSchema.createUserSchema(dataObj);

        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }

        await incidentService.createUser(dataObj, req.tokenDecoded);

        return res.status(global.APP_DATA.STATUS_CODES.CREATED).json({
            isSuccess: true,
            message: global.APP_DATA.STATUS_MESSAGES.USER,
        });
    } catch (error) {
        return next(error);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const dataObj = req.query;
        dataObj.userId = req.params.userId;

        const validation = incidentSchema.getUserByIdSchema(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const data = await incidentService.getUserByIdService(dataObj.userId);

        if (!data) {
            return res.status(global.APP_DATA.STATUS_CODES.NOT_FOUND).json({
                isSuccess: false,
                message: global.APP_DATA.STATUS_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateUserById = async (req, res, next) => {
    try {
        const dataObj = req.body;
        dataObj.userId = req.params.userId;

        const validation = incidentSchema.updateUserById(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const data = await incidentService.updateUserById(
            dataObj,
            req.tokenDecoded,
        );

        if (!data) {
            return res.status(global.APP_DATA.STATUS_CODES.NOT_FOUND).json({
                isSuccess: false,
                message: global.APP_DATA.STATUS_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.deleteUserById = async (req, res, next) => {
    try {
        const dataObj = req.query;
        dataObj.userId = req.params.userId;

        const validation = incidentSchema.deleteUserById(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const data = await incidentService.deleteUserById(
            dataObj,
            req.tokenDecoded,
        );

        if (!data) {
            return res.status(global.APP_DATA.STATUS_CODES.NOT_FOUND).json({
                isSuccess: false,
                message: global.APP_DATA.STATUS_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.getUserInfo = async (req, res, next) => {
    try {
        const dataObj = req.query;
        dataObj.userId = req.tokenDecoded.userId;

        const validation = incidentSchema.getUserByIdSchema(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const data = await incidentService.getUserInfo(req.tokenDecoded);
        if (!data) {
            return res.status(global.APP_DATA.STATUS_CODES.NOT_FOUND).json({
                isSuccess: false,
                message: global.APP_DATA.STATUS_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.updateUserInfoById = async (req, res, next) => {
    try {
        const dataObj = req.body;
        dataObj.userId = req.tokenDecoded.userId;

        const validation = incidentSchema.updateUserInfoById(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }
        const data = await incidentService.updateUserInfo(
            dataObj,
            req.tokenDecoded,
        );

        if (!data) {
            return res.status(global.APP_DATA.STATUS_CODES.NOT_FOUND).json({
                isSuccess: false,
                message: global.APP_DATA.STATUS_MESSAGES.NOT_FOUND,
            });
        }
        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            data,
        });
    } catch (error) {
        return next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(global.APP_DATA.STATUS_CODES.BAD_REQUEST).json({
                isSuccess: false,
                message: global.APP_DATA.STATUS_MESSAGES.INVALID_TOKEN,
            });
        }
        await incidentService.userLogut({
            token,
            userId: req.tokenDecoded.userId,
        });

        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            message: global.APP_DATA.STATUS_MESSAGES.LOGOUT_SUCCESS,
        });
    } catch (error) {
        return next(error);
    }
};

exports.changeUserPassword = async (req, res, next) => {
    try {
        const dataObj = req.body;
        const validation = incidentSchema.changeUserPassword(dataObj);
        if (validation.error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.BAD_REQUEST)
                .json(validation.error);
        }

        const data = await incidentService.changeUserPassword(
            dataObj,
            req.tokenDecoded,
        );

        return res.status(global.APP_DATA.STATUS_CODES.SUCCESS).json({
            isSuccess: true,
            message: global.APP_DATA.STATUS_MESSAGES.PASSWORD_SUCCESS,
            data,
        });
    } catch (error) {
        return next(error);
    }
};
