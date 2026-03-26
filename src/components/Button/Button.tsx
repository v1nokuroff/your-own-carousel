import React from 'react';

import cn from 'classnames';

import styles from './Button.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
};

export const Button = ({ onClick, children, className, ...rest }: ButtonProps) => {
    return (
        <button {...rest} className={cn(styles.button, className)} onClick={onClick}>
            {children}
        </button>
    );
};
