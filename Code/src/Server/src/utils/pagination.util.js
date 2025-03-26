'use strict';

module.exports = (pagination = { pageSize: 10, pageNumber: 0 }) => {
    return {
        limit: pagination.pageSize, // number of results per page
        offset: pagination.pageNumber * pagination.pageSize, // offset based on page number and page size
    };
};
