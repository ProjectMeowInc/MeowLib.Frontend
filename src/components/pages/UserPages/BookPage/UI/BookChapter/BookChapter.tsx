import React from 'react';
import styles from "./bookChapter.module.css"
import {Link} from "react-router-dom";

interface IBookChapterProps {
    chapterId: number
    nameChapter: string
    releaseDate: Date
}

const BookChapter = ({chapterId, nameChapter, releaseDate}: IBookChapterProps) => {

    return (
        <Link to={`chapter/${chapterId}`} className={styles.chapter}>
            <div className={styles.wrapper}>
                <p>{nameChapter}</p>
                <p>{releaseDate.toLocaleString("ru", {dateStyle: "short"})}</p>
            </div>
        </Link>
    );
};

export default BookChapter;