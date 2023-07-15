import React from 'react';
import {IChapterDTO} from "../../../services/models/DTO/IChapterDTO";
import styles from "./chapterItem.module.css"

const ChapterItem = ({name, releaseDate}: IChapterDTO) => {

    const date = new Date(releaseDate)

    return (
        <div className={styles.chapter}>
            <div className={styles.chapter_wrapper}>
                <p>{name}</p>
                <p>{date.toLocaleString("ru",  {year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </div>
    );
};

export default ChapterItem;