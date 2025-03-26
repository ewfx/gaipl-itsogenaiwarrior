'use strict';

const getDocumentExtensionByMime = mimeType => {
    if (!mimeType || typeof mimeType !== 'string') {
        throw new Error('Invalid mimeType');
    }

    const mimeExtensions = new Map([
        ['application/pdf', 'pdf'],
        ['application/msword', 'doc'],
        [
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'docx',
        ],
        ['application/vnd.ms-excel', 'xls'],
        [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'xlsx',
        ],
        ['application/vnd.ms-powerpoint', 'ppt'],
        [
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'pptx',
        ],
        ['text/plain', 'txt'],
        ['application/vnd.oasis.opendocument.text', 'odt'],
        ['application/vnd.oasis.opendocument.spreadsheet', 'ods'],
        ['application/vnd.oasis.opendocument.presentation', 'odp'],
        ['application/rtf', 'rtf'],
        ['application/epub+zip', 'epub'],
    ]);

    return mimeExtensions.get(mimeType) || 'unknown';
};

// Export the function to use in other files
module.exports = { getDocumentExtensionByMime };
