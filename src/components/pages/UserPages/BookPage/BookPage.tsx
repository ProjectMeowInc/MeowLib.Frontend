import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IBook} from "../../../../services/models/entities/BookModels";
import {RedirectService} from "../../../../services/RedirectService";
import {BookService} from "../../../../services/BookService";
import {IChapterDto} from "../../../../services/models/entities/ChapterModels";
import {ChapterService} from "../../../../services/ChapterService";
import Preloader from "../../../UI/Preloader/Preloader";
import styles from "./bookPage.module.css"
import BookInfo from "./UI/BookInfo/BookInfo";
import LayoutContentColumn from "../../../UI/LayoutContentColumn/LayoutContentColumn";

const BookPage = () => {
    const [book, setBook] = useState<IBook| null>(null)
    const [chapters, setChapters] = useState<IChapterDto[] | null>(null)
    const params = useParams()
    const id = params.bookId

    useEffect(() => {
        if (id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        BookService.getBookAsync(parseInt(id)).then(getBookResult => {
            if (getBookResult.tryCatchError()) {
                return
            }

            setBook(getBookResult.unwrap())
        })

        ChapterService.getChaptersAsync(parseInt(id)).then(getChaptersResult => {
            if (getChaptersResult.tryCatchError()) {
                return
            }

            setChapters(getChaptersResult.unwrap())
        })

    }, [id])

    if (!book || !id) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={styles.wrapper}>
            <LayoutContentColumn elements={[<BookInfo book={book}/>]}/>
        </div>
    );
};

export default BookPage;