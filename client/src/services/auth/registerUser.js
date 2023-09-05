import React from 'react';

const registerUser = (entries) => {
    return new Promise((resolve) => {
        fetch('/auth/register-user', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(entries),
        })
        .then(response =>{
            if (response.status == 409) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => resolve(true))
        .catch(() => resolve(false));
    });
};

export default registerUser;