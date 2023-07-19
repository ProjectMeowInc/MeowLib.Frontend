import React from 'react';
import styles from "./bookTag.module.css"

interface IBookTag {
    tag: string
}

const BookTag = ({tag}: IBookTag) => {
    return (
        <div className={styles.tag}>
            {tag}
        </div>
    );
};

export default BookTag;