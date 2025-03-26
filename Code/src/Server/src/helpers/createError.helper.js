'use strict';

const createError = require('http-errors');

exports.createHttpError = (
    message = '',
    statusCode = global.APP_DATA.STATUS_CODES.INTERNAL_SERVER_ERROR,
) => {
    let err = null;

    if (statusCode === global.APP_DATA.STATUS_CODES.BAD_REQUEST) {
        err = new createError.BadRequest(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.UNAUTHORIZED) {
        err = new createError.Unauthorized(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.FORBIDDEN) {
        err = new createError.Forbidden(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.NOT_FOUND) {
        err = new createError.NotFound(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.CONFLICT) {
        err = new createError.TooManyRequests(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.PAYLOAD_TOO_LARGE) {
        err = new createError.RequestHeaderFieldsTooLarge(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.TOO_MANY_REQUESTS) {
        err = new createError.TooManyRequests(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.GATEWAY_TIMEOUT) {
        err = new createError.GatewayTimeout(message);
    } else if (statusCode === global.APP_DATA.STATUS_CODES.BAD_GATEWAY) {
        err = new createError.BadGateway(message);
    } else {
        err = new createError.InternalServerError(message);
    }
    return err;
};
