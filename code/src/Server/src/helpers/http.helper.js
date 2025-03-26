'use strict';

const axios = require('axios');
const qs = require('querystring');

exports.httpRequest = (config, payload) => {
    return new Promise((resolve, reject) => {
        const data = qs.stringify(payload);
        if (data.length) {
            config.data = data;
        }
        axios(config)
            .then(response => {
                return resolve(response.data);
            })
            .catch(error => {
                return reject(error);
            });
    });
};
