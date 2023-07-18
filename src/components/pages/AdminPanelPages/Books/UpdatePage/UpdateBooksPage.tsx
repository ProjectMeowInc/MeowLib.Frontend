import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import Preloader from "../../../../UI/Preloader/Preloader";
import styles from "./updateBooksPage.module.css";
import {IUpdateBookRequest} from "../../../../../services/models/requests/BookRequests";
import {BookService} from "../../../../../services/BookService";
import {RedirectService} from "../../../../../services/RedirectService";
import {AlertService} from "../../../../../services/AlertService";
import ChapterListItem from "./UI/ChapterListItem/ChapterListItem";
import {IChapterDto} from "../../../../../services/models/entities/ChapterModels";
import TagList from "./UI/TagList/TagList";
import AuthorList from "./UI/AuthorList/AuthorList";
import {IAuthor} from "../../../../../services/models/entities/AuthorModels";
import {TagsService} from "../../../../../services/TagsService";
import {ITagDto} from "../../../../../services/models/entities/TagModels";
import {AuthorServices} from "../../../../../services/AuthorServices";
import {ChapterService} from "../../../../../services/ChapterService";
import {useTags} from "../../../../../hooks/useTags";
import {useAuthor} from "../../../../../hooks/useAuthor";

const UpdateBooksPage = () => {
    const [bookData, setBookData] = useState<IUpdateBookRequest | null>(null)
    const [chapters, setChapters] = useState<IChapterDto[] | null>(null)
    const [tagList, setTagList] = useState<ITagDto[] | null>(null)
    const [authorList, setAuthorList] = useState<IAuthor[] | null>(null)
    const [image, setImage] = useState<FormData | null>(null)
    const params = useParams()
    const {selectedTags, setSelectedTags} = useTags()
    const {selectedAuthor, setSelectedAuthor} = useAuthor()

    useEffect(() => {

        if (params.bookId === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        BookService.getBookAsync(parseInt(params.bookId)).then(getBooksResult => {
            if (getBooksResult.tryCatchError()) {
                return
            }

            const book = getBooksResult.unwrap()

            if (book.author) {
                setSelectedAuthor(book.author.id)
            }

            const selectedTagsIds = book.tags.map(tag => tag.id)
            setSelectedTags(selectedTagsIds)

            setBookData({...bookData, name: book.name, description: book.description})
        })

        TagsService.getAllTagsAsync().then(getTagsResult => {
            if (getTagsResult.tryCatchError()) {
                return
            }

            setTagList(getTagsResult.unwrap())
        })

        AuthorServices.getAuthorsAsync().then(getAuthorResult => {
            if (getAuthorResult.tryCatchError()) {
                return
            }

            setAuthorList(getAuthorResult.unwrap())
        })

        ChapterService.getChaptersAsync(parseInt(params.bookId)).then(getChaptersResult => {
            if (getChaptersResult.tryCatchError()) {
                return
            }

            setChapters(getChaptersResult.unwrap())
        })
    }, [params.bookId])

    async function SubmitHandlerAsync () {

        if (params.bookId === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        const updateBookTagsResult = await BookService.updateTagsBookAsync(parseInt(params.bookId), {
            tags: selectedTags
        })

        if (updateBookTagsResult.tryCatchError()) {
            return
        }

        if (image !== null) {
            const uploadImageResult = await BookService.uploadImageBookAsync(parseInt(params.bookId), image)

            if (uploadImageResult.tryCatchError()) {
                return
            }
        }

        if (selectedAuthor !== null) {
            const updateAuthorResult = await BookService.updateBookAuthorAsync(selectedAuthor, parseInt(params.bookId))

            if (updateAuthorResult.tryCatchError()) {
                return
            }
        }

        if (bookData !== null) {
            const updateBookResult = await BookService.updateBookAsync(parseInt(params.bookId), bookData)

            if (!updateBookResult.hasError()) {
                AlertService.successMessage("Книга успешно обновлена")
                return RedirectService.delayRedirect("/admin/books")
            }

            const error = updateBookResult.getError();

            if (!error.isHttpError() || !error.isValidationErrorResponse()) {
                return error.catchError()
            }

            for (let err of error.content.validationErrors) {
                AlertService.errorMessage(`${err.propertyName}: ${err.message}`)
            }
        }
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
                        placeholder={bookData.name ?? "Введите название тега"}/>
                    <textarea
                        onChange={(ctx) => UpdateInformationHandler({...bookData, description: ctx.target.value})}
                        className={styles.textarea}
                        name="tag_description"
                        placeholder={bookData.description ?? "Введите описание тега"}/>
                    <p className={styles.tags_caption}>Загрузка изображения</p>
                    <input onChange={UpdateImageHandler} type="file"/>
                    <p className={styles.tags_caption}>Теги</p>
                    <TagList data={tagList}/>

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