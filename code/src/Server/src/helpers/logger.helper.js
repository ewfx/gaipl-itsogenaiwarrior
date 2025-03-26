'use strict';

const { resolve } = require('path');
const { createWriteStream } = require('fs');
const { createLogger, format, transports } = require('winston');

const logFileStream = createWriteStream(
    resolve(__dirname, '..', '..', 'logs', 'application.log'),
    {
        flags: 'a',
    },
);

// Create a Winston logger instance
const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
        new transports.Stream({
            stream: logFileStream,
        }),
    ],
    exitOnError: false,
});

// Initialize global logger
if (!global.logger) {
    global.logger = logger;
}
