import { setToken, getToken } from '../../utils/setToken';
import authReset from '../../utils/authReset';

const logoutUser = () => {
    const {access_token, refresh_token} = getToken();

    if (!refresh_token) {
        authReset();
        return new Promise.resolve(true);
    }

    return new Promise((resolve) => {
        fetch('/auth/logout-user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': access_token ? `Bearer ${access_token}` : `Bearer ${refresh_token}`,
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
            if (data['token']) {
                const new_access_token = data['token']['access_token'];
                const new_refresh_token = data['token']['refresh_token'];
                setToken(new_access_token, new_refresh_token);
                logoutUser();
            }
            resolve(true);
        })
        .catch(() => {
            resolve(false);
        })
    });
};

export default logoutUser;