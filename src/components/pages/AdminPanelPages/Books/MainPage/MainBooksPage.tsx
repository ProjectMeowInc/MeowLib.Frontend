import React, {useEffect, useState} from 'react';
import styles from "./mainPage.module.css";
import {Link} from "react-router-dom";
import Preloader from "../../../../UI/Preloader/Preloader";
import BooksListItem from "../../../BooksPage/BookListItem/BooksListItem";
import {IBooksResponse} from "../../../../../services/models/responses/IBookResponse";
import {BookService} from "../../../../../services/BookService";


const MainBooksPage = () => {

    const [bookList, setBookList] = useState<IBooksResponse | null>(null)

    useEffect(() => {
        BookService.getBooksAsync().then(getBooksResult => {
            if (getBooksResult.tryCatchError()) {
                return
            }

            setBookList(getBooksResult.unwrap())
        })
    },[])

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
                        <BooksListItem key={book.id} id={book.id} name={book.name} description={book.description} imageName={book.imageName}/>
                    ))
                    : <p className={styles.empty}>Здесь пока ничего нет</p>
            }
        </div>
    );
};

export default MainBooksPage;