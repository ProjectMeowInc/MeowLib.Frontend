import React from 'react';
import styles from "./chapterListItem.module.css";
import {IChapterDto} from "../../../../../../../services/models/entities/ChapterModels";
import {Link, useParams} from "react-router-dom";
import {ChapterService} from "../../../../../../../services/ChapterService";
import {AlertService} from "../../../../../../../services/AlertService";
import {RedirectService} from "../../../../../../../services/RedirectService";

const ChapterListItem = ({id, name, releaseDate}: IChapterDto) => {

    const params = useParams()

    async function DeleteHandler(): Promise<void> {

        const bookId = params.bookId

        if (bookId === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        const deleteChapterResult = await ChapterService.deleteChapterAsync(parseInt(bookId), id)

        if (deleteChapterResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Глава успешно удалена")
        return RedirectService.delayReloadPage()
    }

    return (
        <div className={styles.main_block}>
            <div className={styles.main_block__wrapper}>
                <p>{id}</p>
                <Link to={`chapters/${id}/info`}>{name}</Link>
                <p>{releaseDate.toLocaleString()}</p>
                <div className={styles.buttons}>
                    <Link to={`chapters/${id}/edit`} className={styles.change}>Изменить</Link>
                    <p onClick={DeleteHandler} className={styles.delete}>Удалить</p>
                </div>
            </div>
        </div>
    );
};

export default ChapterListItem;