import authReset from '../../utils/authReset';
import { setToken, getToken } from '../../utils/setToken';

const openPanel = (setTasks, setUsers) => {
    const {access_token, refresh_token} = getToken();

    if (!refresh_token) {
        authReset();
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        fetch('/panel/open-panel', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': access_token ? `Bearer ${access_token}` : `Bearer ${refresh_token}`,
            },
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
                openPanel(setTasks, setUsers);
            }
            setTasks(data['tasks']);
            setUsers(data['users']);
            resolve(false);
        })
        .catch(() => {
            resolve(true);
        });
    });
};

export default openPanel;