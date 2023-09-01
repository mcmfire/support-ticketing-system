import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({className, type, text, onClick}) => {
    return (
        <button className={`button ${className}`} type={type} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func
};

export default Button;