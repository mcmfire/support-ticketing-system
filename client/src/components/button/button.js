import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Button = ({className, type, icon, text, onClick, style}) => {
    return (
        <button className={`button ${className}`} type={type} onClick={onClick} style={style}>
            {text}
            <i className='material-icons'>{icon}</i>
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