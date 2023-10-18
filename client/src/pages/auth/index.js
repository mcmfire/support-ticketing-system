import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Button from '../../components/button/button';
import Form from './form';

const Auth = () => {
    const [toggleForm, setToggleForm] = useState(false);
    
    return (
        <>
        <Navbar navigation={
            <div className='auth-navigation'>
                <Button className='get-started-button' type='button' text='Get Started' onClick={() => setToggleForm(!toggleForm)}/>
            </div>
        }/>
        <div className='auth-page'>
            <h1>Leave no request unresponded.</h1>
            {toggleForm && (
                <Form/>
            )}
        </div>
        </>
    );
};

export default Auth;