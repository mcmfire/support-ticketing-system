import React, {useState, useEffect} from 'react';
import setToken from "../../utils/setToken";

const authenticateUser = (identity, password, setToPanel) => {
    const access_token = sessionStorage.getItem('access_token');

    return new Promise((resolve, reject) => {
        fetch('/auth/login-user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : access_token ? `Bearer ${access_token}` : null
            },
            body: JSON.stringify({
                "identity": identity,
                "password": password
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data['token']) {
                const access_token = data['token']['access_token'];
                const refresh_token = data['token']['refresh_token'];
                setToken(access_token, refresh_token);
                setToPanel(true);
                resolve();
            }   
            resolve();
        });
    });
};

export default authenticateUser;