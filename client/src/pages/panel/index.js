import React, { useState, useEffect } from 'react';
import TaskStream from './taskStream';
import UserStream from './userStream';
import Dialog from '../../components/dialog/dialog';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import { openSocket, closeSocket, disconnectSocket, emitSocket } from '../../utils/setSocket';
import UserRedirect from '../../utils/userRedirect';
import openPanel from '../../services/panel/openPanel';
import logoutUser from '../../services/auth/logoutUser';
import deleteUser from '../../services/settings/deleteUser';
import updateUser from '../../services/settings/updateUser';
import authReset from '../../utils/authReset';

const Panel = () => {
    const [toAuth, setToAuth] = useState(false);
    const [toggleTicket, setToggleTicket] = useState(false);
    const [toggleFinishedTasks, setToggleFinishedTasks] = useState(false);
    const [toggleModifyUser, setToggleModifyUser] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        openSocket('connect', () => {
            emitSocket('join_room', 'admin_room');
            emitSocket('room_members', 'admin_room');
            console.log('[CLIENT]: ', 'Connected to the server.');
        });
        openSocket('room_members', (members) => {
            Array.isArray(members) ? setOnlineUsers(members) : emitSocket('room_members', 'admin_room');
        });
        openSocket('add_task', (newTask) => {
            setTasks((previousTasks) => [...previousTasks, newTask]);
        });
        openSocket('remove_task', (taskId) => {
            setTasks((previousTasks) => previousTasks.filter(previousTasks => previousTasks['_id'] !== taskId));
        });
        openSocket('disconnect', () => {
            emitSocket('leave_room', 'admin_room');
            emitSocket('room_members', 'admin_room');
            console.log('[CLIENT]: ', 'Disconnected to the server.');
        });
        openSocket('connect_error', () => {
            console.log('[CLIENT]: ', 'Cannot establish connection to the server.')
        })
        
        return () => {
            disconnectSocket();
            closeSocket('connect');
            closeSocket('room_members');
            closeSocket('task');
            closeSocket('disconnect');
            closeSocket('connect_error');
        };

    }, []);

    useEffect(() => {
        openPanel(setTasks, setUsers)
        .then(navigate => {
            if (navigate) {
                authReset();
            }
            setToAuth(navigate);
        });

    }, []);

    const endSession = () => {
        logoutUser()
        .then((navigate) => {
            if (navigate) {
                authReset();
                UserRedirect('/auth');
            }
        });
    };

    const removeUser = () => {
        deleteUser()
        .then(() => {
            authReset();
            UserRedirect('/auth');
        });
    };

    const modifyUser = (event) => {
        event.preventDefault();
        const fnameInput = event.target.elements['fname-modify-entry'].value;
        const lnameInput = event.target.elements['lname-modify-entry'].value;
        const emailInput = event.target.elements['email-modify-entry'].value;

        updateUser({
            "first_name": fnameInput,
            "last_name": lnameInput,
            "email": emailInput,
        })
        .then(navigate => {
            if (navigate) {
                authReset();
            }
            else {
                setToggleModifyUser(false);
            }
            setToAuth(navigate);
        });
    };

    return (
        <>
        {toAuth && (
            <Dialog className='auth-dialog' text='Please login to continue.' confirmFunction={() => UserRedirect('/auth')}/>
        )}
        {(!toAuth && !toggleTicket) && (
            <>
            <h1>Panel Page.</h1>
            <Button className='create-ticket-button' type='button' text='Create Ticket' onClick={() => setToggleTicket(true)}/>
            <Button className='finished-tasks-button' type='button' text={toggleFinishedTasks ? 'Active Tasks' : 'Finished Tasks'}
                    onClick={() => setToggleFinishedTasks(!toggleFinishedTasks)}/>
            <Button className='logout-button' type='button' text='Logout' onClick={endSession}/>
            <Button className='delete-account-button' type='button' text='Delete Account' onClick={removeUser}/>
            <Button className='modify-account-button' type='button' text='Modify Account' 
                    onClick={() => setToggleModifyUser(!toggleModifyUser)}/>
            </>
        )}
        {(!toAuth && !toggleModifyUser) && (
            <>
            <TaskStream tasks={tasks} users={users} toggleTicket={toggleTicket} setToggleTicket={setToggleTicket} 
                        toggleFinishedTasks={toggleFinishedTasks} setToAuth={setToAuth} />
            <UserStream onlineUsers={onlineUsers}/>
            </>
        )}
        {(!toAuth && toggleModifyUser) && (
            <>
            <form className='modify-account-form' onSubmit={modifyUser}>
                <Input className='fname-entry' name='fname-modify-entry' 
                        type='text' placeholder='First Name' required/>
                <Input className='lname-entry' name='lname-modify-entry' 
                        type='text' placeholder='Last Name' required/>
                <Input className='email-entry' name='email-modify-entry' 
                        type='email' placeholder='Email'/>
                <Button className='confirm-button' type='submit' text='Confirm'/>
                <Button className='back-button' type='button' text='Back' onClick={() => setToggleModifyUser(false)}/>
            </form>
            </>
        )}
        </>
    );
};

export default Panel;