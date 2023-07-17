import React, {useEffect, useState} from 'react';
import {IChapter} from "../../../../../services/models/entities/ChapterModels";
import Preloader from "../../../../UI/Preloader/Preloader";
import {ChapterService} from "../../../../../services/ChapterService";
import {useParams} from "react-router-dom";
import {RedirectService} from "../../../../../services/RedirectService";
import styles from "./chapterInfoPage.module.css";

const ChapterInfoPage = () => {

    const [chapterData, setChapterData] = useState<IChapter | null>(null)
    const params = useParams();

    useEffect(() => {

        const bookId = params.id
        const chapterId = params.chapterId

        if (bookId === undefined) {
            return RedirectService.redirectToNotFoundPage
        }

        if (chapterId === undefined) {
            return RedirectService.redirectToNotFoundPage
        }

        ChapterService.getChapterAsync(parseInt(bookId), parseInt(chapterId)).then(getChapterResult => {
            if (getChapterResult.tryCatchError()) {
                return
            }

            setChapterData(getChapterResult.unwrap())
        })
    }, [])

    if (chapterData === null) {
        return (
            <Preloader/>
        )
    }

    const createDate = new Date(chapterData.releaseDate)

    return (
        <div className={styles.main}>
            <h1>{chapterData.name}</h1>
            <p className={styles.date}>Дата создания: {createDate.toLocaleString()}</p>
            <p className={styles.chapter_text}>{chapterData.text}</p>
        </div>
    );
};

export default ChapterInfoPage;