'use strict';

exports.sqlRegex =
    /\b(SELECT|INSERT|DELETE|UPDATE|DROP|CREATE|ALTER|TRUNCATE|UNION|DATABASE)\b/i;

exports.lowerCaseLettersRegex = /[a-z]/;

exports.upperCaseLettersRegex = /[A-Z]/;

exports.lettersOnlyRegex = /^[a-zA-Z]+$/;

exports.digitsRegex = /\d/;

exports.digitsOnlyRegex = /^[0-9]+$/;

exports.specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;

exports.phoneNumberRegex = /^\+?[0-9]{10,12}$/;

exports.nameRegex = /^[A-Za-z\s'-]+$/;

exports.zipcodeRegex = /^\d{5}(?:-\d{4})?$/;

exports.dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

exports.timeRegex =
    /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?(?:\s(?:am|pm|AM|PM))?$/;
