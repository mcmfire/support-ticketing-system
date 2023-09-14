import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({className, type, text, onClick, style, disabled}) => {
    return (
        <button className={`button ${className}`} type={type} onClick={onClick} style={style} disabled={disabled}>
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
    disabled: PropTypes.bool,
};

export default Button;