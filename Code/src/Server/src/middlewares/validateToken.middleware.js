'use strict';

const UserModel = require('./../models/user.model');

const { jwtVerifyToken } = require('./../helpers/jwt.helper');
const { USER_ROLES } = require('../enums/userRoles.enum');

exports.tokenValidator = async (req, res, next) => {
    const accessToken = req.headers['x-auth-token'];
    // Check if the route requires authentication
    if (!accessToken) {
        return res.status(global.APP_DATA.STATUS_CODES.FORBIDDEN).json({
            message: global.APP_DATA.STATUS_MESSAGES.FORBIDDEN,
        });
    }

    try {
        const decodedData = await jwtVerifyToken(accessToken);
        req.tokenDecoded = decodedData;

        if (decodedData.role === USER_ROLES.DISTRIBUTOR) {
            const { distributorId } = req.tokenDecoded;
            req.body = req.body || {};
            req.body.distributorId = req.body.distributorId || distributorId;
            req.query = req.query || {};
            req.query.distributorId = req.query.distributorId || distributorId;
        }

        const userInfo = await UserModel.findOne({
            where: {
                userId: decodedData.userId,
            },
        });
        if (!userInfo) {
            return res.status(global.APP_DATA.STATUS_CODES.UNAUTHORIZED).json({
                message: global.APP_DATA.STATUS_MESSAGES.UNAUTHORIZED,
            });
        }

        const _userInfo = userInfo.dataValues;
        delete _userInfo.HASHED_PASSWORD;
        req.userInfo = _userInfo;

        req.authToken = await UserModel.findOne({
            where: {
                token: accessToken,
                userId: _userInfo.userId,
            },
        });
        next();
        return undefined;
    } catch (error) {
        return res
            .status(global.APP_DATA.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({
                message: global.APP_DATA.STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
                error: error.message,
            });
    }
};
