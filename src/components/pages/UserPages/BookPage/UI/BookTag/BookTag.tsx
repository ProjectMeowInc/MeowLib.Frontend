import React from 'react';
import styles from "./bookTag.module.css"

interface IBookTagProps {
    tagName: string
}

const BookTag = ({tagName}: IBookTagProps) => {
    return (
        <div className={styles.tag}>
            {tagName}
        </div>
    );
};

export default BookTag;