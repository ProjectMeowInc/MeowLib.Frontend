import React from 'react';
import styles from "./chapterListItem.module.css";
import {IChapterDTO} from "../../../services/models/DTO/IChapterDTO";
import {Link, useParams} from "react-router-dom";
import {ChapterService} from "../../../services/ChapterService";
import {AlertService} from "../../../services/AlertService";
import {RedirectService} from "../../../services/RedirectService";
import {ErrorTypesEnum} from "../../../services/models/IError";

const ChapterListItem = ({id, name, releaseDate}: IChapterDTO) => {

    const params = useParams()

    async function DeleteHandler(): Promise<void> {

        const bookId = params.id

        if (bookId === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        const deleteChapterError = await ChapterService.deleteChapterAsync(parseInt(bookId), id)

        if (deleteChapterError !== null) {
            if (deleteChapterError.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(deleteChapterError.displayMessage)
            }

            return AlertService.warningMessage(deleteChapterError.displayMessage)
        }

        AlertService.successMessage("Глава успено удалена")
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