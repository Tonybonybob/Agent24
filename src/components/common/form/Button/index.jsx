import React, { Component } from 'react';
import { propTypes } from 'redux-form'; 
import PropTypes from 'prop-types';
import 'style.scss';
class Button extends Component {
    render() {
        const { element, children, className, disabled, fullWidth, primary, type, large } = this.props;
        const buttonProps = {
            className: `
                    button
                    ${className?className:''}
                    ${disabled?'button_disabled':''}
                    ${fullWidth?'button_fullWidth':''}
                    ${primary?'button_primary':''}
                    ${large?'button_large':''}
                `,
            ...(disabled ? { disabled: true } : {}),
            ...(type ? { type: type } : {}),
        };
        let component;
        switch (element) {
            case 'button': 
                component = <button {...buttonProps}>{children}</button>;
                break;
            case 'a':
                component = <a {...buttonProps}>{children}</a>;
                break;
            default:
                component = <div {...buttonProps}>{children}</div>;
        }
        return component;
    }
}

Button.propTypes = {
    type: PropTypes.string,
    large: PropTypes.bool,
    outline: PropTypes.bool,
    disabeld: PropTypes.bool,
    fullWidth: PropTypes.bool,
    upperCase: PropTypes.bool,
    primary: PropTypes.bool,
    children: PropTypes.node
};

export default Button;
