import React from 'react';
import Button from '../../components/button/button';

const Form = () => {
    const submitUsername = () => {
        console.log('Username submitted.');
    };

    return (
        <Button className={'confirm-button'} text='Confirm' onClick={submitUsername}/>
    );
};

export default Form;