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
            console.log('[CLIENT]: ', 'Connected to server.');
        });
        openSocket('message', (message) => {
            console.log('[SERVER]: ', message);
        });
        
        return () => {
            disconnectSocket();
            closeSocket('connect');
            closeSocket('message');
        };

    }, []);

    useEffect(() => {
        openPanel(setMessage)
        .then(navigate => {
            setToAuth(navigate);
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