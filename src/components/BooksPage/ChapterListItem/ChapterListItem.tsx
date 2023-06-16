import React from 'react';
import styles from "./chapterListItem.module.css";
import {IChapterDTO} from "../../../services/models/DTO/IChapterDTO";
import {Link} from "react-router-dom";

const ChapterListItem = ({id, name, releaseDate}: IChapterDTO) => {

    return (
        <div className={styles.main_block}>
            <div className={styles.main_block__wrapper}>
                <p>{id}</p>
                <p>{name}</p>
                <div className={styles.buttons}>
                    <Link to={`chapters/${id}/edit`} className={styles.change}>Изменить</Link>
                    <p className={styles.delete}>Удалить</p>
                </div>
            </div>
        </div>
    );
};

export default ChapterListItem;