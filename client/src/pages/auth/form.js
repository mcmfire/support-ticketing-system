import React, {useState, useEffect} from 'react';
import Input from '../../components/input/input';
import Button from '../../components/button/button';
import './style.css';

const Form = () => {
    const [username, setUsername] = useState('Guest');
    const [identity, setIdentity] = useState('');
    const [toggleNext, setToggleNext] = useState(false);

    useEffect(() => {
        if (toggleNext) {
            fetch('/auth/find-user', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({"identity":identity}),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => setUsername(data['username']));
        }
    }, [toggleNext]);

    const submitIdentity = (event) => {
        event.preventDefault();
        setIdentity(event.target.elements['identity-entry'].value);
        setToggleNext(true);
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