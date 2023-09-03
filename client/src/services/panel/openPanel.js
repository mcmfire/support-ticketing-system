import React from 'react';
import authReset from '../../utils/authReset';
import {setToken, getToken } from '../../utils/setToken';

const openPanel = (setMessage) => {
    const access_token = sessionStorage.getItem('access_token');
    const refresh_token = sessionStorage.getItem('refresh_token');

    if (!refresh_token) {
        authReset();
        return Promise.resolve(true);
    }

    return new Promise((resolve, reject) => {
        fetch('/panel/open-panel', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': access_token ? `Bearer ${access_token}` : `Bearer ${refresh_token}`,
            },
        })
        .then(response => {
            if (response.status == 401) {
                reject(new Error());
            }

            return response.json();
        })
        .then(data => {
            if (data['token']) {
                const new_access_token = data['token']['access_token'];
                const new_refresh_token = data['token']['refresh_token'];
                setToken(new_access_token, new_refresh_token);
            }
            setMessage(data['message']);
            resolve(false);
        })
        .catch(() => {
            resolve(true);
        });
    });
};

export default openPanel;