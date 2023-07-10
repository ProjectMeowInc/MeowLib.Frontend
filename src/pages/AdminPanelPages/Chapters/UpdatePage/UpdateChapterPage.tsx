import React, {useState} from 'react';
import styles from "./updateChapterPage.module.css";
import {IUpdateChapterTextRequest} from "../../../../services/models/requests/IChapterRequests";
import {ChapterService} from "../../../../services/ChapterService";
import {useParams} from "react-router-dom";
import {RedirectService} from "../../../../services/RedirectService";
import {AlertService} from "../../../../services/AlertService";

const UpdateChapterPage = () => {

    const [chapterData, setChapterData] = useState<IUpdateChapterTextRequest | null>(null)
    const params = useParams()

    function ChangeHandler(text: string): void {
        setChapterData({...chapterData, text: text})
    }

    async function SubmitHandlerAsync(): Promise<void> {

        if (!params.bookId) {
            return RedirectService.redirectToNotFoundPage()
        }

        if (!params.chapterId) {
            return RedirectService.redirectToNotFoundPage()
        }

        if (chapterData === null) {
            return AlertService.warningMessage("Не все поля заполнены")
        }

        const updateChapterResult = await ChapterService.updateChapterTextAsync(parseInt(params.bookId), parseInt(params.chapterId), chapterData)

        if (updateChapterResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Текст успешно обновлён")
        return RedirectService.delayRedirectToPrevPage()
    }

    return (
        <div className={styles.wrapper}>
            <h1>Обновление текста главы</h1>
            <textarea onChange={(ctx) => ChangeHandler(ctx.target.value)} className={styles.textarea} placeholder={"Введите текст для главы"}/>
            <button onClick={SubmitHandlerAsync} className={styles.button}>Отправить</button>
        </div>
    );
};

export default UpdateChapterPage;