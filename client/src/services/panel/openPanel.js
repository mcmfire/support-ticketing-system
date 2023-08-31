import React, {useState, useEffect} from 'react';

const openPanel = (setMessage) => {
    const access_token = sessionStorage.getItem('access_token');
    
    if (!access_token) {
        alert("Please login to continue.");
        window.location.href = '/auth';
        return;
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
            resolve(true);
        });
    });
};

export default openPanel;