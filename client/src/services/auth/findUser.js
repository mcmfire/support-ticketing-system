import { useState, useEffect } from 'react';

const findUser = (identity, setUsername = null, setToggleNext = null) => {
    return new Promise((resolve, reject) => {
        fetch('/auth/find-user', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({"identity": identity}),
        })
        .then(response => response.json())
        .then(data => {
            if (setUsername && setToggleNext) {
                setUsername(data['username']);
            
                if (data['username']) {
                    sessionStorage.setItem('username', data['username']);
                    setToggleNext(true);
                }
            }
            resolve(data);
        });
    });
};

export default findUser;