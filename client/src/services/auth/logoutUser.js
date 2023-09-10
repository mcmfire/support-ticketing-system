import React from "react";
import { getToken } from "../../utils/setToken";
import authReset from "../../utils/authReset";

const logoutUser = () => {
    const {access_token, refresh_token} = getToken();
    console.log(refresh_token);
    if (!refresh_token) {
        authReset();
        return new Promise.resolve(true);
    }

    return new Promise((resolve) => {
        fetch('/auth/logout-user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${access_token}` | `Bearer ${refresh_token}`
            },
            body: JSON.stringify({"refresh_token": refresh_token}),
        })
        .then(response => {
            if (response.status == 409) {
                throw new Error();
            }

            return response.json()
        })
        .then(data => {
            console.log(data);
            resolve(true);
        })
        .catch(() => {
            resolve(false);
        })
    });
};

export default logoutUser;