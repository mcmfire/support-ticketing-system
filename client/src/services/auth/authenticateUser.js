import React from 'react';
import {setToken, getToken} from "../../utils/setToken";

const authenticateUser = (identity, password) => {
    const {access_token, refresh_token} = getToken();
    let token = null;

    if (access_token) {
        token = access_token;
    }
    else if (refresh_token) {
        token = refresh_token;
    }

    return new Promise((resolve, reject) => {
        fetch('/auth/login-user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : token ? `Bearer ${token}` : null,
            },
            body: JSON.stringify({
                "identity": identity,
                "password": password
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data['token']) {
                const new_access_token = data['token']['access_token'];
                const new_refresh_token = data['token']['refresh_token'];
                setToken(new_access_token, new_refresh_token);
                return resolve(true);
            }   
            return resolve(false);
        });
    });
};

export default authenticateUser;