import React from 'react';
import {setToken, getToken} from "../../utils/setToken";

const authenticateUser = (password) => {
    const {access_token, refresh_token} = getToken();
    const identity = sessionStorage.getItem('identity');

    let token = null;

    if (access_token) {
        token = access_token;
    }
    else if (refresh_token) {
        token = refresh_token;
    }

    return new Promise((resolve) => {
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
        .then(response => {
            if (response.status == 401) {
                throw new Error();
            }

            return response.json();
        })
        .then(data => {
            if (data['token']) {
                const new_access_token = data['token']['access_token'];
                const new_refresh_token = data['token']['refresh_token'];
                setToken(new_access_token, new_refresh_token);
            }
            console.log(data);
            resolve(true);
        })
        .catch(() => {
            resolve(false);
        });
    });
};

export default authenticateUser;