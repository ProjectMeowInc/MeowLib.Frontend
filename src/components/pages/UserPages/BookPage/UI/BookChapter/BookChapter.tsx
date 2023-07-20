import React from 'react';
import styles from "./bookChapter.module.css"

interface IBookChapterProps {
    nameChapter: string
    releaseDate: Date
}

const BookChapter = ({nameChapter, releaseDate}: IBookChapterProps) => {

    return (
        <div className={styles.chapter}>
            <div className={styles.wrapper}>
                <p>{nameChapter}</p>
                <p>{releaseDate.toLocaleString("ru", {dateStyle: "short"})}</p>
            </div>
        </div>
    );
};

export default BookChapter;