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
import { getImage, uploadImage, deleteImage } from '../../utils/getImage';
import './style.css';

const Settings = () => {
    const [toAuth, setToAuth] = useState(false);
    const [toggleUploadAvatar, setToggleUploadAvatar] = useState(false);
    const [toggleModifyUser, setToggleModifyUser] = useState(false);
    const [accountInfo, setAccountInfo] = useState({});

    useEffect(() => {
        openSettings(setAccountInfo)
        .then(navigate => {
            setToAuth(navigate);
        });
    }, []);

    const changeAvatar = (event, filename) => {
        event.preventDefault();
        const fileInput = event.target.elements['avatar-upload'].files[0];

        uploadImage(filename, fileInput);
    };

    const modifyUser = (event) => {
        event.preventDefault();
        const fnameInput = event.target.elements['fname-modify-entry'].value;
        const lnameInput = event.target.elements['lname-modify-entry'].value;
        const emailInput = event.target.elements['email-modify-entry'].value;
        const departmentInput = event.target.elements['department-modify-entry'].value;
        const positionInput = event.target.elements['position-modify-entry'].value;
        const passwordInput = event.target.elements['password-modify-entry'].value;

        authenticateUser(passwordInput)
        .then(authenticated => {
            if (authenticated) {
                updateUser({
                    "first_name": fnameInput,
                    "last_name": lnameInput,
                    "email": emailInput,
                    "department": departmentInput,
                    "position": positionInput,
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
        const confirm = window.confirm('Delete account?');

        if (confirm === true) {
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
        }
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
                    <Button className='change-avatar-button' type='button' text='Change Avatar'
                            onClick={() => {
                                            setToggleUploadAvatar(!toggleUploadAvatar);
                                            setToggleModifyUser(false);
                                            }}/>
                    <Button className='modify-account-button' type='button' text='Modify Account' 
                            onClick={() => {
                                            setToggleModifyUser(!toggleModifyUser);
                                            setToggleUploadAvatar(false);
                                            }}/>
                    <Button className='delete-account-button' type='button' text='Delete Account' 
                            onClick={() => removeUser(accountInfo['_id'])}/>
                </div>
            )}
            <div className='settings-content'>
                {(!toAuth && toggleUploadAvatar) && (
                    <form className='upload-avatar-form' onSubmit={(event) => changeAvatar(event, accountInfo['_id'])} 
                            encType='multipart/form-data'>
                        <label htmlFor='avatar-upload'>Choose avatar:</label>
                        <Input className='avatar-upload' name='avatar-upload' type='file'/>
                        <Button className='submit-button' type='submit' text='Upload Avatar'/>
                    </form>
                )}
                {(!toAuth && toggleModifyUser) && (
                    <form className='modify-account-form' onSubmit={modifyUser}>
                        <label htmlFor='fname-modify-entry'>First Name</label>
                        <Input className='fname-entry' name='fname-modify-entry' 
                                type='text' placeholder={accountInfo['first_name'] ? accountInfo['first_name'] : 'First Name'}/>
                        <label htmlFor='lname-modify-entry'>Last Name</label>
                        <Input className='lname-entry' name='lname-modify-entry' 
                                type='text' placeholder={accountInfo['last_name'] ? accountInfo['last_name'] : 'Last Name'}/>
                        <label htmlFor='department-modify-entry'>Department</label>
                        <Input className='department-entry' name='department-modify-entry'
                                type='text' placeholder={accountInfo['department'] ? accountInfo['department'] : 'Department'}/>
                        <label htmlFor='position-modify-entry'>Position</label>
                        <Input className='position-entry' name='position-modify-entry'
                                type='text' placeholder={accountInfo['position'] ? accountInfo['position'] : 'Position'}/>
                        <label htmlFor='email-modify-entry'>Email</label>
                        <Input className='email-entry' name='email-modify-entry' 
                                type='email' placeholder={accountInfo['email'] ? accountInfo['email'] : 'Email'}/>
                        <label htmlFor='password-modify-entry'>Confirm Identity</label>
                        <Input className='password-entry' name='password-modify-entry'
                                type='password' placeholder='Password' required/>
                        <Button className='confirm-button' type='submit' text='Confirm'/>
                        <Button className='back-button' type='button' text='Back' onClick={() => setToggleModifyUser(false)}/>
                    </form>
                )}
            </div>
        </div>
        </>
    );
};

export default Settings;