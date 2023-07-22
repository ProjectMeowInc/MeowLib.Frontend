import React from 'react';
import {IBookDto} from "../../../services/models/entities/BookModels";
import styles from "./bookItemRecentlyAdded.module.css"

const BookItemRecentlyAdded = ({name, description}: IBookDto) => {
    return (
        <div className={styles.book}>
            <p className={styles.caption}>{name}</p>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export default BookItemRecentlyAdded;