import React, {useState} from 'react';
import styles from "./createPage.module.css";
import {ChapterService} from "../../../../../services/ChapterService";
import {useParams} from "react-router-dom";
import {ICreateChapterRequest} from "../../../../../services/models/requests/IChapterRequests";
import {RedirectService} from "../../../../../services/RedirectService";
import {AlertService} from "../../../../../services/AlertService";

const CreateChapterPage = () => {

    const [chapterData, setChapterData] = useState<ICreateChapterRequest | null>(null)
    const params = useParams()

    function ChangeHandler(data: ICreateChapterRequest): void {
        setChapterData({
            ...chapterData,
            name: data.name,
            text: data.text
        })
    }

    async function SubmitHandler(): Promise<void> {

        if (params.bookId === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        if (chapterData === null) {
            return AlertService.warningMessage("Не все поля заполнены")
        }

        const createChapterResult = await ChapterService.createChapterAsync(parseInt(params.bookId), chapterData)

        if (createChapterResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Глава успешно создана")
        return RedirectService.delayRedirectToPrevPage()
    }

    return (
        <div className={styles.new_chapter}>
            <h1>Создать главу</h1>

            <input onChange={(ctx) => {ChangeHandler({
                name: ctx.target.value,
                text: chapterData?.text ?? ''
            })}} className={styles.input} type="text" placeholder={"Введите название главы"}/>

            <textarea onChange={(ctx) => {ChangeHandler({
                name: chapterData?.name ?? '',
                text: ctx.target.value
            })}} className={styles.textarea} placeholder={"Введите текст для главы"}/>
            <button onClick={SubmitHandler} className={styles.button}>Создать</button>
        </div>
    );
};

export default CreateChapterPage;