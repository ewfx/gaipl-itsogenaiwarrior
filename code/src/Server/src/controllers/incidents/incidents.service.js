'use strict';
const { getData, writeData } = require('./../../helpers/database.helper');
const { transformIncidentResponse } = require('./incidents.transform');
const { analyzeIncident, userChat } = require('./../../services/opean.service');

const moduleName = 'incidents';

exports.getIncidents = async (dataObj = {}) => {
    try {
        const data = getData(moduleName);
        return transformIncidentResponse(data);
    } catch (error) {
        throw new Error(error.message);
    }
};
exports.getAISuggestion = async (dataObj = {}) => {
    try {
        const data = getData(moduleName);
        const incident = data.incidents.find(
            incident => incident.incidentId === dataObj.incidentId,
        );
        const _incident = {
            description: incident.description,
            severity: incident.severity,
            status: incident.status,
        };
        const aiResponse = await analyzeIncident(JSON.stringify(_incident));
        return JSON.parse(aiResponse.match(/{.*}/s)[0]);
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.createAIChat = async (dataObj = {}) => {
    try {
        const aiResponse = await userChat(dataObj.message);
        return { message: aiResponse };
    } catch (error) {
        throw new Error(error.message);
    }
};
/*
exports.createUser = async (data, userData) => {
    try {
        data.hashedPassword = hashingPassword(data.password);

        delete data.password;

        const userInfo = await createHelper(modelsObj.user, data, userData);
        if (userInfo.role === USER_ROLES.DISTRIBUTOR) {
            await createHelper(
                modelsObj.distributor,
                {
                    gstNumber: 'DUMMY_123',
                    userId: userInfo.userId,
                },
                userData,
            );
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getUserByIdService = async data => {
    try {
        const transformUserById = await findSingleDocHelper(modelsObj.user, {
            userId: data.userId,
        });
        return transformIncidentResponse(transformUserById);
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateUserById = async (data, userData) => {
    try {
        return await updateHelper(
            modelsObj.user,
            { userId: data.userId },
            data,
            userData,
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.deleteUserById = async (data, userData) => {
    try {
        return await deleteHelper(
            modelsObj.user,
            { userId: data.userId },
            userData,
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.getUserInfo = async (data, userData) => {
    try {
        return await findSingleDocHelper(
            modelsObj.user,
            { userId: data.userId },
            userData,
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.updateUserInfo = async (data, userData) => {
    try {
        return await updateHelper(
            modelsObj.user,
            { userId: data.userId },
            data,
            userData,
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

// -------- logout user --------------//
exports.userLogut = async ({ token, userId }) => {
    try {
        const authTokenRecord = await findSingleDocHelper(modelsObj.authToken, {
            token,
        });

        if (!authTokenRecord) {
            throw new Error(global.APP_DATA.STATUS_MESSAGES.BAD_REQUEST);
        }

        return await updateHelper(
            modelsObj.authToken,
            { token },
            { isDeleted: true },
            { userId },
        );
    } catch (error) {
        throw new Error(error.message);
    }
};

exports.changeUserPassword = async (
    { currentPassword, newPassword },
    userData,
) => {
    try {
        const whereConditions = { userId: userData.userId };
        const userDetails = await findSingleDocHelper(modelsObj.user, {
            whereConditions,
        });

        if (!userDetails) {
            throw new Error(global.APP_DATA.STATUS_MESSAGES.NOT_FOUND);
        }

        const isMatch = checkValidPassword(
            currentPassword,
            userDetails.hashedPassword,
        );

        if (!isMatch) {
            throw new Error(global.APP_DATA.STATUS_MESSAGES.BAD_REQUEST);
        }

        const hashedPassword = hashingPassword(newPassword);

        return await updateHelper(
            modelsObj.user,
            { userId: userData.userId },
            { hashedPassword },
            userData,
        );
    } catch (error) {
        throw new Error(error.message);
    }
};
*/
