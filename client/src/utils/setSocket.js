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

export {openSocket, closeSocket, disconnectSocket};