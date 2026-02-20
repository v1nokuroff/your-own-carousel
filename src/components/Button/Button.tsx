import React from 'react';

import cn from 'classnames';

import styles from './Button.module.css';

type ButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    className: string;
};

export const Button = ({ onClick, children, className }: ButtonProps) => {
    return (
        <button className={cn(styles.button, className)} onClick={onClick}>
            {children}
        </button>
    );
};
