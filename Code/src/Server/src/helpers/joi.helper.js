'use strict';

/* Importing modules */
const Joi = require('joi');

const {
    phoneNumberRegex,
    lowerCaseLettersRegex,
    upperCaseLettersRegex,
    lettersOnlyRegex,
    digitsRegex,
    digitsOnlyRegex,
    specialCharactersRegex,
    nameRegex,
    zipcodeRegex,
    dateRegex,
    timeRegex,
} = require('./../helpers/regex.helper');
const daysInMonth = [
        global.APP_DATA.MAGIC_NUMBERS.DAYS_31,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_28,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_31,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_30,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_31,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_30,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_31,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_31,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_30,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_31,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_30,
        global.APP_DATA.MAGIC_NUMBERS.DAYS_31,
    ],
    extention = joi => ({
        type: 'string',
        base: joi.string(),
        messages: {
            'string.sqlInjection': global.APP_DATA.JOI_MESSAGES.SQL_INJECTION,
            'string.password': global.APP_DATA.JOI_MESSAGES.PASSWORD,
            'string.url': global.APP_DATA.JOI_MESSAGES.URL,
            'string.phoneNumber': global.APP_DATA.JOI_MESSAGES.PHONE_NUMBER,
            'string.nameMaxLength':
                global.APP_DATA.JOI_MESSAGES.NAME_MAX_LENGTH,
            'string.nameMinLength':
                global.APP_DATA.JOI_MESSAGES.NAME_MIN_LENGTH,
            'string.name': global.APP_DATA.JOI_MESSAGES.NAME,
            'string.DOB': global.APP_DATA.JOI_MESSAGES.DOB,
            'string.startDate': global.APP_DATA.JOI_MESSAGES.START_DATE,
            'string.endDate': global.APP_DATA.JOI_MESSAGES.END_DATE,
            'string.zipCode': global.APP_DATA.JOI_MESSAGES.ZIP_CODE,
            'string.time': global.APP_DATA.JOI_MESSAGES.TIME,
            'string.lettersOnly': global.APP_DATA.JOI_MESSAGES.CHARACTERS_ONLY,
            'string.digitsOnly': global.APP_DATA.JOI_MESSAGES.DIGITS_ONLY,
            'string.date': global.APP_DATA.JOI_MESSAGES.DATE,
        },
        rules: {
            password: {
                validate(value, helpers) {
                    if (
                        value.length <
                            global.APP_DATA.MAGIC_NUMBERS.MIN_PASSWORD_LENGTH ||
                        !upperCaseLettersRegex.test(value) ||
                        !lowerCaseLettersRegex.test(value) ||
                        !digitsRegex.test(value) ||
                        !specialCharactersRegex.test(value) // Add your desired special characters
                    ) {
                        return helpers.error('string.password', { value });
                    }
                    return value;
                },
            },
            url: {
                validate(value, helpers) {
                    try {
                        new URL(value);
                        return value;
                    } catch (error) {
                        return helpers.error('string.url', { value });
                    }
                },
            },
            phoneNumber: {
                validate(value, helpers) {
                    const isValidPhoneNumber = phoneNumberRegex.test(value);

                    if (isValidPhoneNumber) {
                        return value;
                    }

                    return helpers.error('string.phoneNumber', { value });
                },
            },
            name: {
                validate(value, helpers) {
                    const isValidName = nameRegex.test(value);

                    if (
                        value.length >
                        global.APP_DATA.MAGIC_NUMBERS.NAME_MAX_LENGTH
                    ) {
                        return helpers.error('string.nameMaxLength', { value });
                    }
                    if (!value.length) {
                        return helpers.error('string.nameMinLength', { value });
                    }
                    if (isValidName) {
                        return value;
                    }

                    return helpers.error('string.name', { value });
                },
            },
            DOB: {
                validate(value, helpers) {
                    const msgKey = 'string.DOB';
                    const DOBParts = value.split('/');

                    if (
                        DOBParts.length !==
                        global.APP_DATA.MAGIC_NUMBERS.DATE_PARTS_LENGTH
                    ) {
                        return helpers.error(msgKey, { value });
                    }

                    const month = parseInt(DOBParts[0], 10);
                    const day = parseInt(DOBParts[1], 10);
                    const year = parseInt(DOBParts[2], 10);

                    // Validate the date components
                    if (isNaN(month) || isNaN(day) || isNaN(year)) {
                        return helpers.error(msgKey, { value });
                    }

                    const currentDate = new Date();
                    const DOB = new Date(year, month - 1, day);

                    // Validate the age (maximum 120 years)
                    const maxAgeDate = new Date(
                        currentDate.getFullYear() -
                            global.APP_DATA.MAGIC_NUMBERS.MAX_AGE,
                        currentDate.getMonth(),
                        currentDate.getDate(),
                    );

                    if (
                        isNaN(DOB.getTime()) ||
                        DOB >= currentDate ||
                        DOB <= maxAgeDate
                    ) {
                        return helpers.error(msgKey, { value });
                    }

                    return value;
                },
            },
            startDate: {
                validate(value, helpers) {
                    const msgKey = 'string.startDate';
                    const startDateParts = value.split('/');

                    if (
                        startDateParts.length !==
                        global.APP_DATA.MAGIC_NUMBERS.DATE_PARTS_LENGTH
                    ) {
                        return helpers.error(msgKey, { value });
                    }

                    const month = parseInt(startDateParts[1], 10);
                    const day = parseInt(startDateParts[0], 10);
                    const year = parseInt(startDateParts[2], 10);

                    // Validate the date components
                    if (isNaN(month) || isNaN(day) || isNaN(year)) {
                        return helpers.error(msgKey, { value });
                    }

                    // const currentDate = new Date();
                    // const startDate = new Date(year, month - 1, day);

                    // if (isNaN(startDate.getTime()) || startDate > currentDate) {
                    //     return helpers.error(msgKey, { value });
                    // }

                    return value;
                },
            },
            endDate: {
                validate(value, helpers) {
                    const msgKey = 'string.endDate';
                    const endDateParts = value.split('/');

                    if (
                        endDateParts.length !==
                        global.APP_DATA.MAGIC_NUMBERS.DATE_PARTS_LENGTH
                    ) {
                        return helpers.error(msgKey, { value });
                    }

                    const month = parseInt(endDateParts[1], 10);
                    const day = parseInt(endDateParts[0], 10);
                    const year = parseInt(endDateParts[2], 10);

                    // Validate the date components
                    if (isNaN(month) || isNaN(day) || isNaN(year)) {
                        return helpers.error(msgKey, { value });
                    }

                    // const currentDate = new Date();
                    // const endDate = new Date(year, month - 1, day);

                    // if (isNaN(endDate.getTime()) || endDate <= currentDate) {
                    //     return helpers.error(msgKey, { value });
                    // }

                    return value;
                },
            },
            zipCode: {
                validate(value, helpers) {
                    const isValidZipCode = zipcodeRegex.test(value);

                    if (isValidZipCode) {
                        return value;
                    }

                    return helpers.error('string.zipCode', { value });
                },
            },
            time: {
                validate(value, helpers) {
                    const isValidTime = timeRegex.test(value);

                    if (isValidTime) {
                        return value;
                    }

                    return helpers.error('string.time', { value });
                },
            },
            lettersOnly: {
                validate(value, helpers) {
                    const isLettersOnly = lettersOnlyRegex.test(value);

                    if (!isLettersOnly) {
                        return helpers.error('string.lettersOnly', { value });
                    }

                    return value;
                },
            },
            digitsOnly: {
                validate(value, helpers) {
                    const isDigitsOnly = digitsOnlyRegex.test(value);

                    if (!isDigitsOnly) {
                        return helpers.error('string.digitsOnly', { value });
                    }

                    return value;
                },
            },
            date: {
                validate(value, helpers) {
                    daysInMonth[1] = 28;
                    let isValidDate = false;
                    if (dateRegex.test(value)) {
                        const parts = value.split('/');
                        const day = parseInt(parts[0], 10);
                        const month = parseInt(parts[1], 10);
                        const year = parseInt(parts[2], 10);

                        if (
                            year %
                                global.APP_DATA.MAGIC_NUMBERS
                                    .LEAP_YEAR_DIVISIBLE_BY_400 ===
                                0 ||
                            (year %
                                global.APP_DATA.MAGIC_NUMBERS
                                    .LEAP_YEAR_DIVISIBLE_BY_100 !==
                                0 &&
                                year %
                                    global.APP_DATA.MAGIC_NUMBERS
                                        .LEAP_YEAR_DIVISIBLE_BY_4 ===
                                    0)
                        ) {
                            daysInMonth[1] = 29; // Set February's days to 29 in a leap year
                        }

                        // Validate the date (month and day)
                        if (
                            month > 0 &&
                            month <=
                                global.APP_DATA.MAGIC_NUMBERS.MONTHS_IN_YEAR &&
                            day > 0 &&
                            day <= daysInMonth[month - 1]
                        ) {
                            isValidDate = true;
                        }
                    }

                    if (!isValidDate) {
                        return helpers.error('string.date', { value });
                    }

                    return value;
                },
            },
        },
    });

module.exports = Joi.extend(extention);
