'use strict';

const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const filespath = resolve(__dirname, '..', 'data');
const FILES_PATH = {
    dashboard: resolve(filespath, 'dashboard.json'),
    incidents: resolve(filespath, 'incidents.json'),
};

const getData = module => {
    if (!module) {
        throw 'modulename required.';
    }
    const filePath = FILES_PATH[module] || '';
    if (!filePath) {
        throw 'modulename not valid';
    }
    const data = readFileSync(filePath);
    return JSON.parse(data);
};

const writeData = (module, data) => {
    if (!module) {
        throw 'modulename required.';
    }
    const filePath = FILES_PATH[module] || '';
    if (!filePath) {
        throw 'modulename not valid';
    }
    writeFileSync(filePath, JSON.stringify(data));
};

module.exports = { getData, writeData };
