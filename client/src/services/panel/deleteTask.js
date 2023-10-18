import authReset from '../../utils/authReset';
import { setToken, getToken } from '../../utils/setToken';

const deleteTask = (taskId) => {
    const {access_token, refresh_token} = getToken();

    if (!refresh_token) {
        authReset();
        return Promise.resolve(true);
    }

    return new Promise((resolve) => {
        fetch('/panel/delete-task', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token ? `Bearer ${access_token}` : `Bearer ${refresh_token}`,
            },
            body: JSON.stringify(taskId),
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
                deleteTask(taskId);
            }
            resolve(false);
        })
        .catch(() => {
            resolve(true);
        });
    });
};

export default deleteTask;