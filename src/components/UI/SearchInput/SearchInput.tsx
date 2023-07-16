import React from 'react';
import styles from "./searchInput.module.css";

interface IInputProps {
    placeholder: string
    type: "text" | "password"
}

const SearchInput = ({placeholder, type}: IInputProps) => {
    return (
        <input className={styles.input} type={type} placeholder={placeholder} />
    );
};

export default SearchInput;