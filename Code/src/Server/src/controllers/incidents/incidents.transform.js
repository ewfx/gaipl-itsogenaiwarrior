'use strict';

const transformUser = user => ({
    userId: user.userId,
    userName: user.userName,
    role: user.role,
    email: user.email,
    phoneNumber: user.phoneNumber,
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    lastLoggedOn: user.lastLoggedOn,
    createdOn: user.createdOn ? user.createdOn.toISOString() : null,
    isActive: user.isActive || false,
});

const transformIncidentResponse = records => {
    const _records = records.incidents;
    const returnObj = {
        count: _records.length,
    };
    if (Array.isArray(_records)) {
        returnObj.rows = _records;
    } else {
        returnObj.rows = [transformUser(records)];
    }
    return returnObj;
};
module.exports = { transformIncidentResponse };
