import React from 'react';

const setToken = (access_token, refresh_token) => {
    sessionStorage.setItem('access_token', access_token);
    sessionStorage.setItem('refresh_token', refresh_token);
};

const getToken = () => {
    const access_token = sessionStorage.getItem('access_token');
    const refresh_token = sessionStorage.getItem('refresh_token');

    return {access_token, refresh_token};
}
export {setToken, getToken};