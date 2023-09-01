import React from 'react';
import authReset from '../../utils/authReset';

const openPanel = (setMessage) => {
    const access_token = sessionStorage.getItem('access_token');

    if (!access_token) {
        authReset();
        return Promise.resolve(true);
    }

    return new Promise((resolve, reject) => {
        fetch('/panel/open-panel', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            setMessage(data['message']);
            resolve(false);
        })
        .catch(() => {
            authReset();
            resolve(true);
        });
    });
};

export default openPanel;