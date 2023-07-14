import React, {useEffect, useState} from 'react';
import styles from "./mainPage.module.css";
import {Link} from "react-router-dom";
import Preloader from "../../../../UI/Preloader/Preloader";
import BooksListItem from "../UI/BookListItem/BooksListItem";
import {BookService} from "../../../../../services/BookService";
import {IBookDTO} from "../../../../../services/models/DTO/IBookDTO";


const MainBooksPage = () => {

    const [bookList, setBookList] = useState<IBookDTO[] | null>(null)

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
                : bookList.length !== 0
                    ? bookList.map(book => (
                        <BooksListItem key={book.id} id={book.id} name={book.name} description={book.description} imageName={book.imageName}/>
                    ))
                    : <p className={styles.empty}>Здесь пока ничего нет</p>
            }
        </div>
    );
};

export default MainBooksPage;