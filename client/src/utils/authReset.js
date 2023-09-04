import React from 'react';
import {closeSocket} from '../utils/setSocket';

const authReset = () => {
    closeSocket('connect');
    closeSocket('message');
    closeSocket('connect_error');
    sessionStorage.clear();
};

export default authReset;