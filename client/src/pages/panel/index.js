import React, {useState, useEffect} from 'react';
import TaskStream from './taskStream';
import Dialog from '../../components/dialog/dialog';
import {openSocket, closeSocket, disconnectSocket} from '../../utils/setSocket';
import UserRedirect from '../../utils/userRedirect';
import openPanel from '../../services/panel/openPanel';
import authReset from '../../utils/authReset';

const Panel = () => {
    const [toAuth, setToAuth] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        openSocket('connect', () => {
            console.log('[CLIENT]: ', 'Connected to the server.');
        });
        openSocket('message', (message) => {
            console.log('[SERVER]: ', message);
        });
        openSocket('disconnect', () => {
            console.log('[CLIENT]: ', 'Disconnected to the server.');
        });
        openSocket('connect_error', () => {
            console.log('[CLIENT]: ', 'Cannot establish connection to the server.')
        })
        
        return () => {
            disconnectSocket();
            closeSocket('connect');
            closeSocket('message');
            closeSocket('disconnect');
            closeSocket('connect_error');
        };

    }, []);

    useEffect(() => {
        openPanel(setTasks)
        .then(navigate => {
            if (navigate) {
                authReset();
            }
            setToAuth(navigate);
        });

    }, []);

    return (
        <>
        {toAuth && (
            <Dialog className='auth-dialog' text='Please login to continue.' confirmFunction={() => UserRedirect('/auth')}/>
        )}
            <h1>Panel Page.</h1>
            {tasks.map((task, index) => (
                <p key={`task-${index + 1}`}><strong>Task {`${index + 1}`}:</strong> {task['title']}</p>
            ))}
            <TaskStream/>
        </>
    );
};

export default Panel;