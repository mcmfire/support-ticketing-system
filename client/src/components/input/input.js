import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Input = ({className, type, placeholder}) => {
    return (
        <input className={`button ${className}`} type={type} placeholder={placeholder}>
        </input>
    );
};

Input.PropTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string
}

export default Input;