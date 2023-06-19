import React, {useEffect, useState} from 'react';
import {IChapter} from "../../../services/models/DTO/IChapterDTO";
import Preloader from "../../../components/preloader/preloader";
import {ChapterService} from "../../../services/ChapterService";
import {useParams} from "react-router-dom";
import {RedirectService} from "../../../services/RedirectService";
import {ErrorService} from "../../../services/ErrorService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {AlertService} from "../../../services/AlertService";
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

        ChapterService.getChapterAsync(parseInt(bookId), parseInt(chapterId)).then(chapterResult => {
            if (ErrorService.isError(chapterResult)) {
                if (chapterResult.errorType === ErrorTypesEnum.Critical) {
                    AlertService.errorMessage(chapterResult.displayMessage)
                    return RedirectService.redirectToNotFoundPage()
                }

                return AlertService.warningMessage(chapterResult.displayMessage)
            }

            setChapterData(chapterResult)
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