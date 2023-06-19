import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Preloader from "../../../components/preloader/preloader";
import styles from "./updateBooksPage.module.css";
import {IUpdateBookRequest} from "../../../services/models/requests/IBookRequests";
import {BookService} from "../../../services/BookService";
import {RedirectService} from "../../../services/RedirectService";
import {AlertService} from "../../../services/AlertService";
import {ErrorService} from "../../../services/ErrorService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {ChapterService} from "../../../services/ChapterService";
import ChapterListItem from "../../../components/BooksPage/ChapterListItem/ChapterListItem";
import {IChapterDTO} from "../../../services/models/DTO/IChapterDTO";

const UpdateBooksPage = () => {
    const [bookData, setBookData] = useState<IUpdateBookRequest | null>(null)
    const [chapters, setChapters] = useState<IChapterDTO[] | null>(null)
    const params = useParams()

    useEffect(() => {

        if (params.id === undefined) {
            return RedirectService.redirectToNotFoundPage()
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

        ChapterService.getChaptersAsync(parseInt(params.id)).then(getChaptersResult => {
            if (ErrorService.isError(getChaptersResult)) {
                if (getChaptersResult.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(getChaptersResult.displayMessage)
                }

                return AlertService.warningMessage(getChaptersResult.displayMessage)
            }

            setChapters(getChaptersResult)
        })
    }, [])

    async function SubmitHandlerAsync () {

        if (params.id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        //Чтобы не ругался анализатор

        if (bookData == null) {
            return
        }

        const updateBookResult = await BookService.updateBookAsync(parseInt(params.id), bookData)

        if (ErrorService.isError(updateBookResult)) {
            if (updateBookResult.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(updateBookResult.displayMessage)
            }

            return AlertService.warningMessage(updateBookResult.displayMessage)
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

            <div className={styles.main__block}>
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
                <div className={styles.chapters}>
                    <Link className={styles.create__chapter} to={"chapter/new"}>Создать главу</Link>
                    {
                        chapters !== null
                            ? chapters.map(chapter => (
                                <ChapterListItem id={chapter.id} name={chapter.name} releaseDate={chapter.releaseDate}/>
                            ))
                            : "Здесь пока ничего нет"
                    }
                </div>
            </div>
        </div>
    );
};

export default UpdateBooksPage;