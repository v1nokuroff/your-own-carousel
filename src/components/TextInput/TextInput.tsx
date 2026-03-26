import React from 'react';

import cn from 'classnames';

import styles from './TextInput.module.css';

type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    onChange: (value: string) => void;
    className?: string;
};

export const TextInput = ({ className, onChange, type = 'text', ...rest }: TextInputProps) => {
    return (
        <input
            className={cn(styles.input, className)}
            type={type}
            onChange={({ target: { value } }) => onChange(value)}
            {...rest}
        />
    );
};
