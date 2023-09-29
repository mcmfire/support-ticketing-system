import React from 'react';
import Button from '../button/button';
import './style.css';

const Navbar = ({toggleForm, setToggleForm}) => {
    return (
        <div className='navbar-container'>
            <Button className='get-started-button' type='button' text='Get Started' onClick={() => setToggleForm(!toggleForm)}/>
        </div>
    );
};

export default Navbar;