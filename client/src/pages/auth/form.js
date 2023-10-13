import React, { useState } from 'react';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import findUser from '../../services/auth/findUser';
import authenticateUser from '../../services/auth/authenticateUser';
import registerUser from '../../services/auth/registerUser';
import UserRedirect from '../../utils/userRedirect';
import './style.css';

const Form = () => {
    const [username, setUsername] = useState('');
    const [toggleNext, setToggleNext] = useState(false);
    const [toggleRegister, setToggleRegister] = useState(false);
    const [toPanel, setToPanel] = useState(false);

    const submitIdentity = (event) => {
        event.preventDefault();
        const identityInput = event.target.elements['identity-entry'].value;

        findUser(identityInput, setUsername, setToggleNext);
    };

    const submitPassword = (event) => {
        event.preventDefault();
        const passwordInput = event.target.elements['password-entry'].value;

        authenticateUser(passwordInput).then((navigate) => {
            if (!navigate) {
                alert('Invalid password.');
            }

            setToPanel(navigate);
        });
    };

    const submitRegistration = (event) => {
        event.preventDefault();
        const usernameInput = event.target.elements['username-register-entry'].value;
        const passwordInput = event.target.elements['password-register-entry'].value;
        const cpasswordInput = event.target.elements['cpassword-register-entry'].value;
        const fnameInput = event.target.elements['fname-register-entry'].value;
        const lnameInput = event.target.elements['lname-register-entry'].value;
        const emailInput = event.target.elements['email-register-entry'].value;
        
        if (passwordInput.length < 8 || passwordInput.length > 16) {
            alert('Password must be between 8 and 16 characters long.');
            return;
        }

        if (passwordInput === cpasswordInput) {
            registerUser({
                "username": usernameInput,
                "password": passwordInput,
                "first_name": fnameInput,
                "last_name": lnameInput,
                "email": emailInput,
                }
            )
            .then(navigate => {
                navigate ? setToPanel(true) : alert('User not registered.');
            });
        }
        else {
            alert('Password does not match.');
        }
    };

    const goBack = (event) => {
        event.preventDefault();
        setUsername('');
        toggleNext ? setToggleNext(false): setToggleRegister(false);
    };

    return (
        <div className='auth-view'>
            <div className='form-container'>
                {toPanel && UserRedirect('/panel')}
                {!toggleNext && !toggleRegister && (
                    <>
                    <h1>Let's be a wingman today!</h1>
                    <form className='identity-form' onSubmit={submitIdentity}>
                        <div className='identity-field'>
                            <span className="material-icons" id='identity-icon'>person</span>
                            <Input className='identity-entry' name='identity-entry' type='text' placeholder='Username or Email' required/>
                        </div>
                        <Button className='confirm-button' type='submit' text='Confirm'/>
                        <Button className='signup-button' type='button' text='Signup' onClick={() => setToggleRegister(true)}/>
                    </form>
                    </>
                )}
                {toggleNext && !toggleRegister && (
                    <>
                    <h1>Welcome back, {username}!</h1>
                    <form className='password-form' onSubmit={submitPassword}>
                        <div className='identity-field'>
                            <span className="material-icons" id='password-icon'>lock</span>
                            <Input className='password-entry' name='password-entry' type='password' placeholder='Password' required/>
                        </div>
                        <Button className='login-button' type='submit' text='Login'/>
                        <Button className='back-button' type='button' text='Back' onClick={goBack}/>
                    </form>
                    </>
                )}
                {toggleRegister && (
                    <>
                    <h1>Create an account</h1>
                    <form className='registration-form' onSubmit={submitRegistration}>
                        <Input className='username-entry' name='username-register-entry' 
                                type='text' placeholder='Username' required/>
                        <Input className='password-entry' name='password-register-entry' 
                                type='password' placeholder='Password' required/>
                        <Input className='cpassword-entry' name='cpassword-register-entry'
                                type='password' placeholder='Confirm Password' required/>
                        <Input className='fname-entry' name='fname-register-entry' 
                                type='text' placeholder='First Name' required/>
                        <Input className='lname-entry' name='lname-register-entry' 
                                type='text' placeholder='Last Name' required/>
                        <Input className='email-entry' name='email-register-entry' 
                                type='email' placeholder='Email'/>
                        <Button className='register-button' type='submit' text='Register'/>
                        <Button className='back-button' type='button' text='Back' onClick={goBack}/>
                    </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Form;