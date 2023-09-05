const findUser = (identity, setUsername = null, setToggleNext = null) => {
    return new Promise((resolve) => {
        fetch('/auth/find-user', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({"identity": identity}),
        })
        .then(response => {
            if (response.status == 401) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            if (setUsername && setToggleNext) {
                setUsername(data['username']);
            
                if (data['username']) {
                    sessionStorage.setItem('username', data['username']);
                    setToggleNext(true);
                }
            }
            resolve(data);
        })
        .catch(() => {
            resolve(false);
        });
    });
};

export default findUser;