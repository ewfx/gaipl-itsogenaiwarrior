'use strict';

const nodemailer = require('nodemailer');
let transporter = null;

const createTransport = () => {
    transporter = nodemailer.createTransport({
        service: global.APP_DATA.VAR.EMAIL_SERVICE,
        host: global.APP_DATA.VAR.EMAIL_HOST,
        port: global.APP_DATA.VAR.EMAIL_PORT,
        secure: false,
        auth: {
            user: global.APP_DATA.VAR.EMAIL_USER,
            pass: global.APP_DATA.VAR.EMAIL_PASSWORD,
        },
    });
};

exports.sendEmail = async data => {
    if (!transporter) {
        createTransport();
    }
    return await transporter.sendMail({
        from: data.email,
        to: data.email,
        subject: data.subject,
        html: data.html,
    });
};
