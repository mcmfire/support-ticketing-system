import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({className, text, onClick}) => {
    return (
        <button className={`button ${className}`} onClick={onClick}>
            {text}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

export default Button;