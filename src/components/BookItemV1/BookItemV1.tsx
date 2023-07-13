import React from 'react';
import {IBookDTO} from "../../services/models/DTO/IBookDTO";
import styles from "./bookItemV1.module.css"

const BookItemV1 = ({id, name, description}: IBookDTO) => {
    return (
        <div className={styles.book}>
            <p className={styles.caption}>{name}</p>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default BookItemV1;