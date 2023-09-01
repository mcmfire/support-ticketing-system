import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/button';
import './style.css';

const Dialog = ({className, text, confirmFunction}) => {
    return (
        <div className={`div ${className}`}>
            <h1>{text}</h1>
            <Button className='confirm-button' type='button' text='Confirm' onClick={confirmFunction}/>
        </div>
    );
};

Dialog.PropTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    confirmFunction: PropTypes.func
}

export default Dialog;