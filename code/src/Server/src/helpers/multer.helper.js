'use strict';

const { tmpdir } = require('os');
const { unlink } = require('fs');
const multer = require('multer');

const generateUniqueFileName = file => {
    return `${Date.now()}-${file.originalname}`;
};

/**
 * Multer diskStorage configuration to use temporary directory for file uploads.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tmpdir()); // Use system's temp directory for file storage
    },
    filename: (req, file, cb) => {
        cb(null, generateUniqueFileName(file)); // Generate unique file name
    },
});

/**
 * Initialize Multer with storage configuration and file size limit.
 * Also includes file filter for additional validations if needed in the future.
 */
const upload = multer({
    storage,
    limits: { fileSize: global.APP_DATA.MAGIC_NUMBERS.MAX_FILE_SIZE },
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
});

const removeTempFile = filePath => {
    unlink(filePath, error => {
        /* eslint-disable-next-line no-console */
        console.error('Error in deleting file', error);
    });
};

module.exports = { upload, removeTempFile };
