import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({className, type, text, onClick, style}) => {
    return (
        <button className={`button ${className}`} type={type} onClick={onClick} style={style}>
            {text}
        </button>
    );
};

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
};

export default Button;