import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Preloader from "../../../components/preloader/preloader";
import styles from "./updateBooksPage.module.css";
import {IUpdateBookRequest} from "../../../services/models/requests/IBookRequests";
import {BookService} from "../../../services/BookService";
import {RedirectService} from "../../../services/RedirectService";
import {AlertService} from "../../../services/AlertService";
import {ErrorService} from "../../../services/ErrorService";
import {ErrorTypesEnum} from "../../../services/models/IError";

const UpdateBooksPage = () => {
    const [bookData, setBookData] = useState<IUpdateBookRequest | null>(null)
    const params = useParams()

    useEffect(() => {

        if (params.id === undefined) {
            AlertService.warningMessage("Не найдено")
            return RedirectService.delayRedirect("404-not-found")
        }

        BookService.getBookAsync(parseInt(params.id)).then(response => {
            if (ErrorService.isError(response)) {
                if (response.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(response.displayMessage)
                }

                return AlertService.warningMessage(response.displayMessage)
            }

            setBookData({...bookData, name: response.name, description: response.description})
        })
    }, [])

    async function SubmitHandlerAsync () {

        if (params.id === undefined) {
            AlertService.warningMessage("Не найдено")
            return RedirectService.delayRedirect("404-not-found")
        }

        if (bookData == null) {
            return
        }

        const response = await BookService.updateBook(parseInt(params.id), bookData)

        if (ErrorService.isError(response)) {
            if (response.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(response.displayMessage)
            }

            return AlertService.warningMessage(response.displayMessage)
        }

        AlertService.successMessage("Книга успешно обновлена")
        return RedirectService.delayRedirect("/admin/books")
    }

    function UpdateInformationHandler(updateBookData: IUpdateBookRequest) {
        setBookData({...bookData, name: updateBookData.name, description: updateBookData.description})
    }

    if (bookData === null) {
        return (
            <Preloader/>
        )
    }

    return (
        <div>
            <h1 className={styles.caption}>Обновление информации о книге</h1>
            <div className={styles.placeholders}>
                <input
                    onChange={(ctx) => UpdateInformationHandler({...bookData, name: ctx.target.value})}
                    className={styles.input}
                    type="text"
                    placeholder={bookData.name ?? "Введите название тэга"}/>
                <textarea
                    onChange={(ctx) => UpdateInformationHandler({...bookData, description: ctx.target.value})}
                    className={styles.textarea}
                    name="tag_description"
                    placeholder={bookData.description ?? "Введите описание тега"}/>
                <button onClick={SubmitHandlerAsync} className={styles.button}>Сохранить</button>
            </div>
        </div>
    );
};

export default UpdateBooksPage;