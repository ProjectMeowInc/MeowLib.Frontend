import React, {useEffect, useState} from 'react';
import styles from "./mainPage.module.css";
import {Link} from "react-router-dom";
import Preloader from "../../../../components/preloader/preloader";
import BooksListItem from "../../../../components/BooksPage/BookListItem/BooksListItem";
import {IBooksResponse} from "../../../../services/models/responses/IBookResponse";
import {GetBooksAsync} from "../../../../helpers/Books/GetBooks";

const MainBooksPage = () => {

    const [bookList, setBookList] = useState<IBooksResponse | null>(null)

    useEffect(() => {
        GetBooksAsync().then(response => setBookList(response))
    })

    return (
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
    );
};

export default MainBooksPage;