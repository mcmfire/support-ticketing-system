import React, {useState, useEffect} from 'react';
import {setToken, getToken} from "../../utils/setToken";

const authenticateUser = (identity, password, setToPanel) => {
    const {access_token, refresh_token} = getToken();
    
    return new Promise((resolve, reject) => {
        fetch('/auth/login-user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : access_token ? `Bearer ${access_token}` : `Bearer ${refresh_token}`,
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
                setToPanel(true);
                resolve();
            }   
            resolve();
        });
    });
};

export default authenticateUser;