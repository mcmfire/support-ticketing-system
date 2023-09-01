import React from 'react';

const UserRedirect = (path) => {
    window.history.replaceState(null, '', path);

    window.location.replace(path);
};

export default UserRedirect;