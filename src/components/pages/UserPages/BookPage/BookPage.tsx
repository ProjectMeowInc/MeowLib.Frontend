import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IBook} from "../../../../services/models/entities/BookModels";
import {IChapterDto} from "../../../../services/models/entities/ChapterModels";
import styles from "./bookPage.module.css"
import LayoutContentColumn from "../../../UI/LayoutContentColumn/LayoutContentColumn";
import BookDescription from "./UI/BookDescription/BookDescription";
import Preloader from "../../../UI/Preloader/Preloader";
import {BookService} from "../../../../services/BookService";
import {RedirectService} from "../../../../services/RedirectService";
import BookInfo from "./UI/BookInfo/BookInfo";

const BookPage = () => {
    const [book, setBook] = useState<IBook| null>(null)
    const [chapters, setChapters] = useState<IChapterDto[] | null>(null)
    const params = useParams()
    const bookId = params.bookId

    useEffect(() => {

        if (!bookId) {
            return RedirectService.redirectToNotFoundPage()
        }

        BookService.getBookAsync(parseInt(bookId)).then(getBookResult => {
            if (getBookResult.tryCatchError()) {
                return
            }

            setBook(getBookResult.unwrap())
        })
    }, [])

    if (book === null) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={styles.wrapper}>
            <LayoutContentColumn elements={[<BookInfo bookId={book.id} bookName={book.name} imageName={book.imageUrl}/>]}/>
            <LayoutContentColumn flex={0} elements={[<BookDescription description={book.description} tags={book.tags}/>]}/>
        </div>
    );
};

export default BookPage;