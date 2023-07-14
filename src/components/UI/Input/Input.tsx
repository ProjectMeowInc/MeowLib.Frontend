import React from 'react';
import styles from "./input.module.css";

interface IInputProps {
    placeholder: string
    type: "text" | "password"
}

const Input = ({placeholder, type}: IInputProps) => {
    return (
        <input className={styles.input} type={type} placeholder={placeholder} />
    );
};

export default Input;