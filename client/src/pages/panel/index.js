import React, {useState, useEffect} from 'react';
import TaskStream from './taskStream';
import Dialog from '../../components/dialog/dialog';
import {openSocket, closeSocket, disconnectSocket} from '../../utils/setSocket';
import UserRedirect from '../../utils/userRedirect';
import openPanel from '../../services/panel/openPanel';

const Panel = () => {
    const [toAuth, setToAuth] = useState(false);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        openSocket('connect', () => {
            console.log('[CLIENT]: ', 'Connected to the server.');
        });
        openSocket('message', (message) => {
            console.log('[SERVER]: ', message);
        });
        openSocket('connect_error', () => {
            console.log('[CLIENT]: ', 'Cannot establish connection to the server.')
        })
        
        return () => {
            disconnectSocket();
            closeSocket('connect');
            closeSocket('message');
            closeSocket('connect_error');
        };

    }, []);

    useEffect(() => {
        openPanel(setMessage)
        .then(navigate => {
            if (navigate) {
                closeSocket('connect');
                closeSocket('message');
                closeSocket('connect_error');
                setToAuth(true);
            }
            else {setToAuth(false);}
        });

    }, []);

    return (
        <>
        {toAuth && (
            <Dialog className='auth-dialog' text='Please login to continue.' confirmFunction={() => UserRedirect('/auth')}/>
        )}
            <h1>Panel Page.</h1>
            <p>{message}</p>
            <TaskStream/>
        </>
    );
};

export default Panel;