import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Input = ({className, name, type, placeholder, value, required = false}) => {
    return (
        <input className={`button ${className}`} name={name} type={type} placeholder={placeholder} value={value} required={required}>
        </input>
    );
};

Input.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    required: PropTypes.bool
};

export default Input;