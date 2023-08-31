import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Input = ({className, name, type, placeholder}) => {
    return (
        <input className={`button ${className}`} name={name} type={type} placeholder={placeholder}>
        </input>
    );
};

Input.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string
};

export default Input;