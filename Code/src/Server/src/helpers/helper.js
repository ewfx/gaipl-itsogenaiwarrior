'use strict';

/* This is a function that is used to escape the string. */
exports.escapeString = (value = '') => {
    if (!value) {
        return "''";
    }
    const _value = value.toString().trim().replace(/'/g, "''");
    return "'" + _value + "'";
};

/* This is a function that is used to check if the value is a number or not. */
exports.isNumber = (n = 0) => {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
};

/* This is a function that is used to convert the value to number. */
exports.toNumber = (n = 0) => {
    if (this.isNumber(n)) {
        return parseInt(n, 10);
    }
    return 0;
};
