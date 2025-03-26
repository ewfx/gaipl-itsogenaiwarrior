'use strict';

process.chdir(__dirname);
const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Service Distributor Dashboard API Documentation',
        version: '1.0.0',
        description: 'This is a REST API.',
        contact: {
            name: '',
            email: '',
        },
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./../routes/routes.v1.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
