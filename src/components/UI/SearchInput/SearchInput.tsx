import React from 'react';
import styles from "./searchInput.module.css";

interface ISearchInputProps {
    placeholder: string
    type: "text" | "password"
}

const SearchInput = ({placeholder, type}: ISearchInputProps) => {
    return (
        <input className={styles.input} type={type} placeholder={placeholder} />
    );
};

export default SearchInput;