import React, {useState, useEffect} from 'react';
import openPanel from '../../services/panel/openPanel';

const TaskStream = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        openPanel(setMessage)
        .then(isAuthenticated => setAuthenticated(isAuthenticated));
    }, []);

    return (
        <div>
            {authenticated && (<h1>{message}</h1>)}
        </div>
    );
};

export default TaskStream;