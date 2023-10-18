import React, { Suspense, useState, useEffect } from 'react';
import Navbar from '../../components/navbar/navbar';
import Dialog from '../../components/dialog/dialog';
import Button from '../../components/button/button';
import Input from '../../components/input/input';
import { ModifyAccountForm } from './form';
import logoutUser from '../../services/auth/logoutUser';
import openSettings from '../../services/settings/openSettings';
import deleteUser from '../../services/settings/deleteUser';
import authReset from '../../utils/authReset';
import UserRedirect from '../../utils/userRedirect';
import { readImage, uploadImage, deleteImage } from '../../utils/getImage';
import './style.css';

const Settings = () => {
    const [toAuth, setToAuth] = useState(false);
    const [toggleUploadAvatar, setToggleUploadAvatar] = useState(true);
    const [toggleModifyUser, setToggleModifyUser] = useState(false);
    const [accountInfo, setAccountInfo] = useState({});
    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        openSettings(setAccountInfo, setUserAvatar)
        .then(navigate => {
            setToAuth(navigate);
        });
    }, []);

    const changeAvatar = (event, filename) => {
        event.preventDefault();
        const fileInput = event.target.elements['avatar-upload'].files[0];

        uploadImage(filename, fileInput);
    };

    const endSession = () => {
        const confirm = window.confirm('Are you sure you want to logout?');

        if (confirm === true) {
            logoutUser()
            .then((navigate) => {
                if (navigate) {
                    authReset();
                    UserRedirect('/auth');
                }
            });
        }
    };

    const removeUser = (imageId) => {
        const confirm = window.confirm('Delete your account? This cannot be undone.');

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
            <Dialog className='auth-dialog' text='Please login to continue.' confirmFunction={() => {UserRedirect('/auth'); authReset();}}/>
        )}
        {!toAuth && (
            <>
            <Navbar navigation={
                <div className='settings-tabs'>
                    <Button className='panel-button' type='button' text='Panel' onClick={() => UserRedirect('/panel')}/>
                    <Button className='logout-button' type='button' text='Logout' onClick={endSession}/>
                </div>
            }/>
            <div className='settings-page'>
                <div className='settings-options'>
                    <Button className='change-avatar-button' type='button' text='Change Avatar'
                            onClick={() => {
                                            setToggleUploadAvatar(true);
                                            setToggleModifyUser(false);
                                            }}/>
                    <Button className='modify-account-button' type='button' text='Modify Account' 
                            onClick={() => {
                                            setToggleModifyUser(true);
                                            setToggleUploadAvatar(false);
                                            }}/>
                    <Button className='delete-account-button' type='button' text='Delete Account' 
                            onClick={() => removeUser(accountInfo['_id'])}/>
                </div>
                <div className='settings-content'>
                    {toggleUploadAvatar && (
                        <Suspense fallback={<></>} children={
                            <div className='upload-avatar-container'>
                                <img src={userAvatar} alt={accountInfo['username']} loading='lazy' 
                                    style={{border: '#1e1e1e 2px solid', borderRadius: '50%', height: '100px', width: '100px'}}/>
                                <form className='upload-avatar-form' onSubmit={(event) => changeAvatar(event, accountInfo['_id'])} 
                                        encType='multipart/form-data'>
                                    <label htmlFor='avatar-upload'>Choose avatar:</label>
                                    <Input className='avatar-upload' name='avatar-upload' type='file' accept='.png, .jpg, .jpeg, image/png, image/jpeg'
                                            onChange={(event) => readImage(event, setUserAvatar)}/>
                                    <Button className='submit-button' type='submit' text='Upload Avatar'/>
                                </form>
                            </div>
                        }/>
                    )}
                    {toggleModifyUser && (
                        <Suspense fallback={<></>} children={
                            <ModifyAccountForm accountInfo={accountInfo} setToggleModifyUser={setToggleModifyUser} 
                                                setToAuth={setToAuth}/>
                        }/>
                    )}
                </div>
            </div>
            </>
        )}
        </>
    );
};

export default Settings;