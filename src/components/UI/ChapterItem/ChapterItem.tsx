import React from 'react';
import {IChapterDto} from "../../../services/models/entities/ChapterModels";
import styles from "./chapterItem.module.css"
import {Link} from "react-router-dom";

const ChapterItem = ({id, name, releaseDate}: IChapterDto) => {

    const date = new Date(releaseDate)

    return (
        <Link to={`chapter/${id}`} className={styles.chapter}>
            <div className={styles.chapter_wrapper}>
                <p>{name}</p>
                <p>{date.toLocaleString("ru",  {year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
        </Link>
    );
};

export default ChapterItem;