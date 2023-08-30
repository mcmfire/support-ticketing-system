import React, {useState, useEffect} from 'react';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import findUser from '../../services/auth/findUser';
import './style.css';

const Form = () => {
    const [username, setUsername] = useState('');
    const [identity, setIdentity] = useState('');
    const [toggleNext, setToggleNext] = useState(false);

    useEffect(() => {
        if (identity) {findUser(identity, setUsername, setToggleNext);}
    }, [identity]);

    const submitIdentity = (event) => {
        event.preventDefault();
        let userInput = event.target.elements['identity-entry'].value

        if (userInput) {setIdentity(userInput);}
        
    };

    const submitPassword = (event) => {
        event.preventDefault();
        console.log('User authenticated.');
    };

    const goBack = (event) => {
        event.preventDefault();
        setToggleNext(false);
    };

    return (
        <div className='form-container'>
            {!toggleNext && (<h1>Let's be a wingman today!</h1>)}
            {toggleNext && (<h1>Welcome back, {username}!</h1>)}
            {!toggleNext && (
                <form className='identity-form' onSubmit={submitIdentity}>
                    <Input className='identity-entry' name='identity-entry' type='text' placeholder='Username or Email'/>
                    <Button className='confirm-button' type='submit' text='Confirm'/>
                </form>
            )}
            {toggleNext && (
                <form className='password-form' onSubmit={submitPassword}>
                    <Input className='password-entry' type='password' placeholder='Password'/>
                    <Button className='login-button' type='submit' text='Login'/>
                    <Button className='back-button' type='button' text='Back' onClick={goBack}/>
                </form>
            )}
        </div>
    );
};

export default Form;