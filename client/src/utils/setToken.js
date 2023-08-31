import React from 'react';

const setToken = (access_token, refresh_token) => {
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);
};

export default setToken;