const authenticateUser = (identity, password) => {
    return new Promise((resolve, reject) => {
        fetch('/auth/login-user', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "identity": identity,
                "password": password
            }),
        })
        .then(response => response.json())
        .then(data => {
            resolve(data);
        });
    })
}

export default authenticateUser;