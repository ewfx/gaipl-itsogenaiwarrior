'use strict';

const { getCurrentTimestampInISOFormat } = require('./date.helper');

const getUserId = userData => {
    if (userData && userData.userId) {
        return userData.userId;
    } else {
        throw new Error(global.APP_DATA.STATUS_MESSAGES.NOT_FOUND);
    }
};

exports.createdByUser = userData => {
    return {
        createdBy: getUserId(userData),
        distibutorId: getUserId(userData),
        createdOn: getCurrentTimestampInISOFormat(),
        isDeleted: false,
    };
};

exports.modifiedByUser = userData => {
    return {
        modifiedBy: getUserId(userData),
        modifiedOn: getCurrentTimestampInISOFormat(),
    };
};

exports.deletedByUser = userData => {
    return {
        deletedBy: getUserId(userData),
        deletedOn: getCurrentTimestampInISOFormat(),
        isDeleted: true,
    };
};
