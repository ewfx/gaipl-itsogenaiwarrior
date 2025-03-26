'use strict';

/* Importing the jsonwebtoken module. */
const jwt = require('jsonwebtoken');

const { encodeMessage, decodeMessage } = require('./encrypt.helper');

/* Exporting the function jwtTokenGenerate to generate jwt token. */
exports.jwtGenerateToken = (data = {}) => {
    return jwt.sign(
        { data: encodeMessage(JSON.stringify(data)) },
        global.APP_DATA.VAR.SECRET,
        {
            expiresIn: global.APP_DATA.VAR.TOKEN_EXPIRE_TIME,
        },
    );
};

/* This is a function that is used to verify the token. */
exports.jwtVerifyToken = (token = '') => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, global.APP_DATA.VAR.SECRET, (error, decoded) => {
            if (error) {
                return reject(error);
            } else {
                const _decoded = decodeMessage(decoded.data);
                return resolve(JSON.parse(_decoded));
            }
        });
    });
};

exports.createRefreshToken = (payload = {}) => {
    return jwt.sign(
        { data: encodeMessage(JSON.stringify(payload)) },
        global.APP_DATA.VAR.JWT_REFRESH_SECRET,
        {
            expiresIn: '7d',
        },
    );
};

exports.jwtVerifyRefreshToken = (token = '') => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            global.APP_DATA.VAR.JWT_REFRESH_SECRET,
            (error, decoded) => {
                if (error) {
                    return reject(error);
                }
                try {
                    const _decoded = decodeMessage(decoded.data);
                    return resolve(JSON.parse(_decoded));
                } catch (err) {
                    return reject(err);
                }
            },
        );
    });
};
