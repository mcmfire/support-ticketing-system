import React from 'react';
import './style.css';

const Navbar = ({navigation}) => {
    return (
        <div className='navbar-container'>
            {navigation}
        </div>
    );
};

export default Navbar;