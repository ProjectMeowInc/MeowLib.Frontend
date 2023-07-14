import React from 'react';
import styles from "./input.module.css";

interface IInput {
    placeholder: string
    type: "text" | "password"
}

const Input = ({placeholder, type}: IInput) => {
    return (
        <input className={styles.input} type={type} placeholder={placeholder} />
    );
};

export default Input;