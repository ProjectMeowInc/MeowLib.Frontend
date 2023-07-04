import React, {useContext, useEffect, useState} from 'react';
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
import {TagsService} from "../../../services/TagsService";
import TagList from "../../../components/BooksPage/TagList/TagList";
import {IGetTagsResponse} from "../../../services/models/responses/IGetTagsResponse";
import {TagsContext} from "../../../context/TagsContext";

const UpdateBooksPage = () => {
    const [bookData, setBookData] = useState<IUpdateBookRequest | null>(null)
    const [chapters, setChapters] = useState<IChapterDTO[] | null>(null)
    const [tagList, setTagList] = useState<IGetTagsResponse | null>(null)
    const params = useParams()
    const {selectedTags, setSelectedTags} = useContext(TagsContext)

    useEffect(() => {

        if (params.id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        BookService.getBookAsync(parseInt(params.id)).then(result => {
            if (ErrorService.isError(result)) {
                if (result.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(result.displayMessage)
                }

                return AlertService.warningMessage(result.displayMessage)
            }

            const selectedTagsIds = result.tags.map(tag => tag.id)

            setSelectedTags(selectedTagsIds)

            setBookData({...bookData, name: result.name, description: result.description})
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

        TagsService.getAllTagsAsync().then(getTagsResult => {
            if (ErrorService.isError(getTagsResult)) {
                if (getTagsResult.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(getTagsResult.displayMessage)
                }

                return AlertService.warningMessage(getTagsResult.displayMessage)
            }

            setTagList(getTagsResult)
        })
    }, [])

    async function SubmitHandlerAsync () {

        if (params.id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        const updateBookTagsResult = await BookService.updateTagsBook(parseInt(params.id), {
            tags: selectedTags
        })

        if (ErrorService.isError(updateBookTagsResult)) {
            if (updateBookTagsResult.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(updateBookTagsResult.displayMessage)
            }

            return AlertService.warningMessage(updateBookTagsResult.displayMessage)
        }

        AlertService.successMessage("Данные о книге были обновлены")

        //Чтобы не ругался анализатор

        if (bookData === null) {
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

    if (bookData === null || tagList === null) {
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
                    <TagList data={tagList.data}/>
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