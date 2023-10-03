import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Dialog from '../../components/dialog/dialog';
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import authenticateUser from "../../services/auth/authenticateUser";
import logoutUser from "../../services/auth/logoutUser";
import openSettings from "../../services/settings/openSettings";
import updateUser from "../../services/settings/updateUser";
import deleteUser from "../../services/settings/deleteUser";
import authReset from "../../utils/authReset";
import UserRedirect from "../../utils/userRedirect";
import { deleteImage } from '../../utils/getImage';
import './style.css';

const Settings = () => {
    const [toAuth, setToAuth] = useState(false);
    const [toggleModifyUser, setToggleModifyUser] = useState(false);
    const [accountInfo, setAccountInfo] = useState({});

    useEffect(() => {
        openSettings(setAccountInfo)
        .then(navigate => {
            setToAuth(navigate);
        });
    }, []);

    const modifyUser = (event) => {
        event.preventDefault();
        const fnameInput = event.target.elements['fname-modify-entry'].value;
        const lnameInput = event.target.elements['lname-modify-entry'].value;
        const emailInput = event.target.elements['email-modify-entry'].value;
        const passwordInput = event.target.elements['password-modify-entry'].value;

        authenticateUser(passwordInput)
        .then(authenticated => {
            if (authenticated) {
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
            }
            else {
                console.log('Invalid password.');
            }
        });
    };

    const endSession = () => {
        logoutUser()
        .then((navigate) => {
            if (navigate) {
                authReset();
                UserRedirect('/auth');
            }
        });
    };

    const removeUser = (imageId) => {
        deleteUser()
        .then(() => {
            deleteImage(imageId)
            .then((navigate) => {
                if (navigate) {
                    authReset();
                    UserRedirect('/auth');
                }
            });
        });
    };

    return (
        <>
        {toAuth && (
            <Dialog className='auth-dialog' text='Please login to continue.' confirmFunction={() => UserRedirect('/auth')}/>
        )}
        {!toAuth && (
            <Navbar navigation={
                <>
                <Button className='panel-button' type='button' text='Panel' onClick={() => UserRedirect('/panel')}/>
                <Button className='logout-button' type='button' text='Logout' onClick={endSession}/>
                </>
            }/>
        )}
        <div className='settings-page'>
            {!toAuth && (
                <div className='settings-options'>
                    <Button className='modify-account-button' type='button' text='Modify Account' 
                            onClick={() => setToggleModifyUser(!toggleModifyUser)}/>
                    <Button className='delete-account-button' type='button' text='Delete Account' 
                            onClick={() => removeUser(accountInfo['_id'])}/>
                </div>
            )}
            {(!toAuth && toggleModifyUser) && (
                <div className='settings-content'>
                    <form className='modify-account-form' onSubmit={modifyUser}>
                        <label htmlFor='fname-modify-entry'>First Name</label>
                        <Input className='fname-entry' name='fname-modify-entry' 
                                type='text' placeholder='First Name' value={accountInfo['first_name']} required/>
                        <label htmlFor='lname-modify-entry'>Last Name</label>
                        <Input className='lname-entry' name='lname-modify-entry' 
                                type='text' placeholder='Last Name' value={accountInfo['last_name']} required/>
                        <label htmlFor='email-modify-entry'>Email</label>
                        <Input className='email-entry' name='email-modify-entry' 
                                type='email' placeholder='Email' value={accountInfo['email']}/>
                        <label htmlFor='password-modify-entry'>Confirm Identity</label>
                        <Input className='password-entry' name='password-modify-entry'
                                type='password' placeholder='Password' required/>
                        <Button className='confirm-button' type='submit' text='Confirm'/>
                        <Button className='back-button' type='button' text='Back' onClick={() => setToggleModifyUser(false)}/>
                    </form>
                </div>
            )}
        </div>
        </>
    );
};

export default Settings;