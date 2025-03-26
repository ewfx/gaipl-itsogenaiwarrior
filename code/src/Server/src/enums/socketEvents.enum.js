'use strict';

// Using Object.freeze to ensure immutability for both the object and values array
const SOCKET_EVENTS = Object.freeze({
    CONNECTION: 'connection',
    CREATE_USER: 'createUser',
    USER_CREATED: 'userCreated',
    DISCONNECT: 'disconnect',
});

module.exports = { SOCKET_EVENTS };
