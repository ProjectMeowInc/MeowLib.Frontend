import React, {useEffect, useState} from 'react';
import styles from "./mainPage.module.css";
import {Link} from "react-router-dom";
import Preloader from "../../../components/preloader/preloader";
import BooksListItem from "../../../components/BooksPage/BookListItem/BooksListItem";
import {IBooksResponse} from "../../../services/models/responses/IBookResponse";
import {BookService} from "../../../services/BookService";
import {ErrorService} from "../../../services/ErrorService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {AlertService} from "../../../services/AlertService";
import {TagContextProvider} from "../../../context/TagsContext";

const MainBooksPage = () => {

    const [bookList, setBookList] = useState<IBooksResponse | null>(null)

    useEffect(() => {
        BookService.getBooksAsync().then(response => {
            if (ErrorService.isError(response)) {
                if (response.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(response.displayMessage)
                }

                return AlertService.warningMessage(response.displayMessage)
            }

            setBookList(response)
        })
    }, [])

    return (
        <TagContextProvider>
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление авторами</h1>

            <Link to={"new"} className={styles.add_button}>
                <p>Нажмите чтобы добавить новую книгу</p>
            </Link>

            {bookList === null
                ? <Preloader/>
                : bookList.items.length !== 0
                    ? bookList.items.map(book => (
                        <BooksListItem key={book.id} id={book.id} name={book.name} description={book.description}/>
                    ))
                    : <p className={styles.empty}>Здесь пока ничего нет</p>
            }
        </div>
            </TagContextProvider>
    );
};

export default MainBooksPage;