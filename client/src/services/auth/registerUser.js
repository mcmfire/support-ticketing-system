import findUser from './findUser';
import authenticateUser from './authenticateUser';

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
        .then(data => {
            findUser(entries['username'])
            .then(user => {
                if (user) {
                    authenticateUser(entries['password'])
                    .then(navigate => {
                        resolve(navigate);
                    });
                }
            });
        })
        .catch(() => resolve(false));
    });
};

export default registerUser;