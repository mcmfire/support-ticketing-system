import React from 'react';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

const Form = () => {
    const submitUsername = () => {
        console.log('Username submitted.');
    };

    return (
        <form onSubmit={submitUsername}>
            <Input className={'username-entry'} type='text' placeholder='Username'/>
            <Input className={'password-entry'} type='password' placeholder='Password'/>
            <Button className={'confirm-button'} type='submit' text='Confirm'/>
        </form>
    );
};

export default Form;