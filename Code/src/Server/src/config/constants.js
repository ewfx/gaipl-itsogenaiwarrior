'use strict';

require('./var');

global.APP_DATA.STATUS_MESSAGES = {
    INVALID_LOGIN: 'Invalid Credentials',
    LOGIN_SUCCESS: 'User authenticated successfully',
    LOGOUT_SUCCESS: 'User authenticated successfully logged out',
    LOGIN_FAILURE: 'User entered Invalid credentials',
    REGISTER_SUCCESS: 'User registered successfully',
    REGISTER_FAILURE: 'User already Registered',
    EXCEPTION: 'Something went wrong',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Not Found',
    FETCH_SUCCESS: 'User details found',
    FETCH_FAILURE: 'User details not found',
    EMAIL_SUCCESS: 'Email sent Successfully',
    DB_URL_NOT_FOUND: 'DB URL not found',
    DB_CONNECTION_ERROR: 'DB URL is not working',
    USER_EXIST: 'User already exist',
    BAD_REQUEST: 'BadRequest',
    FORBIDDEN: 'Forbidden',
    CONFLICT: 'Conflict',
    PAYLOAD_TOO_LARGE: 'PayloadTooLarge',
    INTERNAL_SERVER_ERROR: 'InternalServerError',
    BAD_GATEWAY: 'BadGateway',
    GATEWAY_TIMEOUT: 'GatewayTimeout',
    TOO_MANY_REQUESTS: 'Too Many Requests',
    INVALID_TOKEN: 'Invalid Token',
    TOKEN_EXPIRED: 'Refresh token has been expired',
    INVALID_EMAIL_OR_USERNAME: 'Email or username is required',
    INVALID_USER_ID_OR_CREATED_BY: 'User id or created by is required',
    UPDATED_PASSWORD_SUCCESS: 'Password changed successfully',
    USER: 'User registered successfully',
};

global.APP_DATA.STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    PAYLOAD_TOO_LARGE: 413,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    GATEWAY_TIMEOUT: 504,
    200: 'SUCCESS',
    201: 'CREATED',
    400: 'BAD_REQUEST',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    409: 'CONFLICT',
    404: 'NOT_FOUND',
    413: 'PAYLOAD_TOO_LARGE',
    429: 'TOO_MANY_REQUESTS',
    500: 'INTERNAL_SERVER_ERROR',
    502: 'BAD_GATEWAY',
    504: 'GATEWAY_TIMEOUT',
};

global.APP_DATA.JOI_MESSAGES = {
    SQL_INJECTION: '{{#label}} contains SQL keywords which are not allowed.',
    PASSWORD:
        '{{#label}} must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    URL: '{{#label}} Invalid URL format.',
    PHONE_NUMBER:
        '{{#label}} must be a valid phone number with 10 to 12 digits, optionally starting with a "+".',
    NAME_MAX_LENGTH: '{{#label}} must be less than 50 characters.',
    NAME_MIN_LENGTH: '{{#label}} must contain atleat one character.',
    NAME: '{{#label}} must be a valid name.',
    DOB: '{{#label}} must be a valid Date of Birth (DOB) in the format MM/DD/YYYY and the age must be at most 120 years.',
    START_DATE:
        '{{#label}} must be a valid start date in the format MM/DD/YYYY.',
    END_DATE: '{{#label}} must be a valid end date in the format MM/DD/YYYY.',
    ZIP_CODE: '{{#label}} must be a valid zipCode.',
    TIME: '{{#label}} must be a valid date and time in the format HH:mm:ss AM.',
    CHARACTERS_ONLY: '{{#label}} must be characters only.',
    DIGITS_ONLY: '{{#label}} must be digits only.',
    DATE: '{{#label}} date must be valid MM/DD/YYYY format.',
};

global.APP_DATA.MAGIC_NUMBERS = {
    DAYS_28: 28,
    DAYS_30: 30,
    DAYS_31: 31,
    MAX_AGE: 120,
    SALT_ROUNDS: 10,
    MONTHS_IN_YEAR: 12,
    NAME_MAX_LENGTH: 50,
    DATE_PARTS_LENGTH: 3,
    MIN_PASSWORD_LENGTH: 8,
    LEAP_YEAR_DIVISIBLE_BY_4: 4,
    MILLI_SECONDS_FOR_SECONDS: 1000,
    LEAP_YEAR_DIVISIBLE_BY_400: 400,
    LEAP_YEAR_DIVISIBLE_BY_100: 100,
    LEAKY_BUCKET_CAPACITY: 60,
    LEAKY_BUCKET_TIME_TO_REFILL: 60000,
    ONE_MIN_IN_MS: 60000,
    MAX_FILE_SIZE: 10485760, // 10MB
    DEFUALT_PAGE_NUMBER: 0,
    DEFUALT_PAGE_SIZE: 10,
    DECIMAL_PRECISION: 2,
    MIN_PAGE_SIZE: 10,
};

Object.freeze(global.APP_DATA);
