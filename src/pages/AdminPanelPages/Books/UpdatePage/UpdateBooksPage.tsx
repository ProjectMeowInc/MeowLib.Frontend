import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Preloader from "../../../../components/preloader/preloader";
import styles from "./updateBooksPage.module.css";
import {IUpdateBookRequest} from "../../../../services/models/requests/IBookRequests";
import {BookService} from "../../../../services/BookService";
import {RedirectService} from "../../../../services/RedirectService";
import {AlertService} from "../../../../services/AlertService";
import {ErrorService} from "../../../../services/ErrorService";
import {ErrorTypesEnum} from "../../../../services/models/IError";
import ChapterListItem from "../../../../components/BooksPage/ChapterListItem/ChapterListItem";
import {IChapterDTO} from "../../../../services/models/DTO/IChapterDTO";
import TagList from "../../../../components/BooksPage/TagList/TagList";
import {IGetTagsResponse} from "../../../../services/models/responses/IGetTagsResponse";
import {TagsContext} from "../../../../context/TagsContext";
import AuthorList from "../../../../components/BooksPage/AuthorList/AuthorList";
import {IAuthorDTO} from "../../../../services/models/DTO/IAuthorModels";
import {AuthorContext} from "../../../../context/AuthorContext";
import {GetTagsAsync} from "../../../../helpers/Tags/GetTagsAsync";
import {GetChaptersAsync} from "../../../../helpers/Books/GetChaptersAsync";
import {GetAuthorsAsync} from "../../../../helpers/Authors/GetAuthorsAsync";

const UpdateBooksPage = () => {
    const [bookData, setBookData] = useState<IUpdateBookRequest | null>(null)
    const [chapters, setChapters] = useState<IChapterDTO[] | null>(null)
    const [tagList, setTagList] = useState<IGetTagsResponse | null>(null)
    const [authorList, setAuthorList] = useState<IAuthorDTO[] | null>(null)
    const [image, setImage] = useState<FormData | null>(null)
    const params = useParams()
    const {selectedTags, setSelectedTags} = useContext(TagsContext)
    const {selectedAuthor, setSelectedAuthor} = useContext(AuthorContext)

    useEffect(() => {

        if (params.bookId === undefined) {
            return
        }

        GetChaptersAsync(parseInt(params.bookId)).then(result => setChapters(result))
        GetTagsAsync().then(result => setTagList(result))
        GetAuthorsAsync().then(result => setAuthorList(result))

        BookService.getBookAsync(parseInt(params.bookId)).then(result => {
            if (ErrorService.isError(result)) {
                if (result.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(result.displayMessage)
                }

                return AlertService.warningMessage(result.displayMessage)
            }

            if (result.author) {
                setSelectedAuthor(result.author.id)
            }

            const selectedTagsIds = result.tags.map(tag => tag.id)
            setSelectedTags(selectedTagsIds)

            setBookData({...bookData, name: result.name, description: result.description})
        })
    }, [])

    async function SubmitHandlerAsync () {

        if (params.bookId === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        const updateBookTagsResult = await BookService.updateTagsBookAsync(parseInt(params.bookId), {
            tags: selectedTags
        })

        if (ErrorService.isError(updateBookTagsResult)) {
            if (updateBookTagsResult.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(updateBookTagsResult.displayMessage)
            }

            return AlertService.warningMessage(updateBookTagsResult.displayMessage)
        }

        if (image !== null) {
            const uploadImageResult = await BookService.uploadImageBookAsync(parseInt(params.bookId), image)

            if (ErrorService.isError(uploadImageResult)) {
                if (uploadImageResult.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(uploadImageResult.displayMessage)
                }

                return AlertService.warningMessage(uploadImageResult.displayMessage)
            }
        }

        if (selectedAuthor !== null) {
            const updateAuthorResult = await BookService.updateBookAuthorAsync(selectedAuthor, parseInt(params.bookId))

            if (ErrorService.isError(updateAuthorResult)) {
                if (updateAuthorResult.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(updateAuthorResult.displayMessage)
                }

                return AlertService.warningMessage(updateAuthorResult.displayMessage)
            }
        }

        if (bookData !== null) {
            const updateBookResult = await BookService.updateBookAsync(parseInt(params.bookId), bookData)

            if (ErrorService.isError(updateBookResult)) {
                if (updateBookResult.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(updateBookResult.displayMessage)
                }

                return AlertService.warningMessage(updateBookResult.displayMessage)
            }
        }

        AlertService.successMessage("Книга успешно обновлена")
        return RedirectService.delayRedirect("/admin/books")
    }

    function UpdateInformationHandler(updateBookData: IUpdateBookRequest) {
        setBookData({...bookData, name: updateBookData.name, description: updateBookData.description})
    }

    function UpdateImageHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        if (event.target.files) {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append("image", file)
            setImage(formData)
        }
    }

    if (bookData === null || tagList === null || authorList === null) {
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
                    <p className={styles.tags_caption}>Загрузка изображения</p>
                    <input onChange={UpdateImageHandler} type="file"/>
                    <p className={styles.tags_caption}>Тэги</p>
                    <TagList data={tagList.data}/>

                    <p className={styles.tags_caption}>Авторы</p>
                    <AuthorList authorList={authorList}/>

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