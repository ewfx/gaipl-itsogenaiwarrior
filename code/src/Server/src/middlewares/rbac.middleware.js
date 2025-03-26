'use strict';

exports.rbacMiddleware = requiredRoles => {
    return (req, res, next) => {
        try {
            const hasRole = requiredRoles.includes(req.tokenDecoded.role);

            if (hasRole) {
                return next();
            }

            return res.status(global.APP_DATA.STATUS_CODES.FORBIDDEN).json({
                message: global.APP_DATA.STATUS_MESSAGES.FORBIDDEN,
            });
        } catch (error) {
            return res
                .status(global.APP_DATA.STATUS_CODES.INTERNAL_SERVER_ERROR)
                .json({
                    message:
                        global.APP_DATA.STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
                    error: error.message,
                });
        }
    };
};
