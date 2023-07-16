import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IChapter} from "../../../../services/models/DTO/IChapterDTO";
import {ChapterService} from "../../../../services/ChapterService";
import {RedirectService} from "../../../../services/RedirectService";
import Preloader from "../../../UI/Preloader/Preloader";
import styles from "./chapterPage.module.css";
import Settings from "./UI/Settings/Settings";
import {SettingsContext} from "../../../../context/SettingsContext";

const ChapterPage = () => {

    const [chapter, setChapter] = useState<IChapter | null>(null)
    const {settings} = useContext(SettingsContext)
    const params = useParams()

    const chapterId = params.chapterId
    const bookId = params.bookId

    useEffect(() => {

        if (!bookId || !chapterId) {
            return RedirectService.redirectToNotFoundPage()
        }

        ChapterService.getChapterAsync(parseInt(bookId), parseInt(chapterId)).then(getChapterResult => {
            if (getChapterResult.tryCatchError()) {
                return
            }

            setChapter(getChapterResult.unwrap())
        })
    }, [chapterId, bookId])

    if (chapter === null) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.page}>
                <h1 className={styles.caption}>{chapter.name}</h1>
                <p style={{fontSize: `${settings.reader.fontSize}px`, lineHeight: settings.reader.lineHeight / 10}} className={styles.text}>{chapter.text}</p>
            </div>
            <Settings/>
        </div>
    );
};

export default ChapterPage;