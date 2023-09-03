import React from 'react';
import authReset from '../../utils/authReset';

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
            setMessage(data['message']);
            resolve(false);
        })
        .catch(() => {
            resolve(true);
        });
    });
};

export default openPanel;