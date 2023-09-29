import React, { useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Form from './form';

const Auth = () => {
    const [toggleForm, setToggleForm] = useState(false);

    return (
        <>
        <Navbar toggleForm={toggleForm} setToggleForm={setToggleForm}/>
        {!toggleForm && (
            <h1>Leave no request unresponded.</h1>
        )}
        {toggleForm && (
            <Form/>
        )}
        </>
    );
};

export default Auth;