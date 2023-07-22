import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IChapter} from "../../../../services/models/entities/ChapterModels";
import {ChapterService} from "../../../../services/ChapterService";
import {RedirectService} from "../../../../services/RedirectService";
import Preloader from "../../../UI/Preloader/Preloader";
import Settings from "./UI/Settings/Settings";
import {useSettings} from "../../../../hooks/useSettings";
import LayoutContentColumn from "../../../UI/LayoutContentColumn/LayoutContentColumn";
import Reader from "./UI/Reader/Reader";

const ChapterPage = () => {

    const [chapter, setChapter] = useState<IChapter | null>(null)
    const {settings} = useSettings()
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
        <>
            <LayoutContentColumn flex={2} elements={[
                <Reader caption={chapter.name} text={chapter.text}/>
            ]}/>
            <LayoutContentColumn flex={1} elements={[
                <Settings/>
            ]}/>
        </>
    );
};

export default ChapterPage;