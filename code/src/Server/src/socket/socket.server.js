'use strict';

const { Server } = require('socket.io');
const expressSession = require('express-session');

const { SOCKET_EVENTS } = require('./../enums/socketEvents.enum');

exports.createSocketServer = async server => {
    const io = new Server(server);

    io.use((socket, next) => {
        expressSession({
            secret: global.APP_DATA.VAR.SESSION_SECRET_KEY,
            resave: false,
            saveUninitialized: false,
        })(socket.request, {}, next);
    });

    io.on(SOCKET_EVENTS.CONNECTION, socket => {
        socket.on(SOCKET_EVENTS.CREATE_USER, async data => {
            try {
                io.emit(SOCKET_EVENTS.USER_CREATED, data);
            } catch (error) {
                throw new Error(error.message);
            }
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {});
    });
};
