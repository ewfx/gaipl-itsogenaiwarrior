'use strict';

// errorHandler.js
/* eslint-disable-next-line no-unused-vars */
exports.errorHandler = (error, req, res, next) => {
    const errStatus =
        error.statusCode || global.APP_DATA.STATUS_CODES.INTERNAL_SERVER_ERROR;
    const errMsg = error.message || global.APP_DATA.STATUS_MESSAGES.EXCEPTION;

    if (!res.headersSent) {
        res.status(errStatus).json({
            isSuccess: false,
            status: errStatus,
            message: errMsg,
            stack:
                global.APP_DATA.VAR.NODE_ENV === 'development'
                    ? error.stack
                    : {},
        });
    }
};
