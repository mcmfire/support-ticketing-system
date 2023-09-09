import React from "react";
import {getToken} from "../../utils/setToken";

const createTask = (entries) => {
    const {access_token, refresh_token} = getToken();

    return new Promise((resolve) => {
        fetch('/panel/create-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}` | `Bearer ${refresh_token}`
            },
            body: JSON.stringify(entries),
        })
        .then(response => {
            if (response.status == 401) {
                throw new Error();
            }

            return response.json();
        })
        .then(data => {
            console.log(data);
            resolve(true);
        })
        .catch(() => {
            resolve(false);
        });
    });
};

export default createTask;