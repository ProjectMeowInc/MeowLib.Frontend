import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IBook} from "../../../../services/models/entities/BookModels";
import styles from "./bookPage.module.css"
import LayoutContentColumn from "../../../UI/LayoutContentColumn/LayoutContentColumn";
import BookDescription from "./UI/BookDescription/BookDescription";
import Preloader from "../../../UI/Preloader/Preloader";
import {BookService} from "../../../../services/BookService";
import {RedirectService} from "../../../../services/RedirectService";
import BookInfo from "./UI/BookInfo/BookInfo";
import BookSwitchComponent from "./UI/SwitchComponent/BookSwitchComponent";
import {AlertService} from "../../../../services/AlertService";

const BookPage = () => {
    const [book, setBook] = useState<IBook| null>(null)
    const params = useParams()
    const bookId = params.bookId

    useEffect(() => {

        if (!bookId) {
            return RedirectService.redirectToNotFoundPage()
        }

        BookService.getBookAsync(parseInt(bookId)).then(getBookResult => {
            if (getBookResult.hasError()) {
                AlertService.errorMessage(getBookResult.getError().displayMessage)
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
            <LayoutContentColumn flex={0} elements={[<BookDescription description={book.description} tags={book.tags}/>, <BookSwitchComponent bookId={book.id}/>]}/>
        </div>
    );
};

export default BookPage;