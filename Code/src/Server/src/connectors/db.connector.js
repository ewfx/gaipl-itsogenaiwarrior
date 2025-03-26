'use strict';

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(global.APP_DATA.VAR.DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        process.exit(1);
    }
};

module.exports = connectDB;
