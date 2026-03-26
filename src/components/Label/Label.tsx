import React from 'react';

import cn from 'classnames';

import styles from './Label.module.css';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
    value: string;
    children?: React.ReactNode;
    className?: string;
    required?: boolean;
};

export const Label = ({ value, children, className, required, ...rest }: LabelProps) => {
    return (
        <div className={cn(styles.label, className)}>
            <label {...rest}>
                {value}
                {required && '*'}
                {':'} {children}
            </label>
        </div>
    );
};
