import React from 'react';
import io from 'socket.io-client';

const socket = io.connect({transports: ['websocket', 'polling']});

const openSocket = (event, eventHandler) => {
    socket.on(event, (data = null) => {
        eventHandler(data);
    })
};

const closeSocket = (event) => {
    socket.off(event);
};

const disconnectSocket = () => {
    socket.disconnect();
};

const emitSocket = (event, message) => {
    socket.emit(event, message);
};

export {openSocket, closeSocket, disconnectSocket, emitSocket};