import React, {useEffect, useState} from 'react';
import styles from "./libraryPage.module.css";
import SearchInput from "../../../UI/SearchInput/SearchInput";
import {IBookDTO} from "../../../../services/models/DTO/IBookDTO";
import {BookService} from "../../../../services/BookService";
import LibraryBookItem from "../../../UI/LibraryBookItem/LibraryBookItem";

const LibraryPage = () => {

    const [books, setBooks] = useState<IBookDTO[] | null>(null)

    useEffect(() => {
        BookService.getBooksAsync().then(getBooksResult => {
            if (getBooksResult.tryCatchError()) {
                return
            }

            const books = getBooksResult.unwrap()

            setBooks(books)
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.caption}>Библиотека ранобэ</h1>

            <div className={styles.search}>
                <SearchInput placeholder={"Что ищем, семпай?"} type={"text"}/>
                <img className={styles.send} src="/img/send.svg" alt=""/>
            </div>
            <div className={styles.books}>
                {
                    books && books.map(book => (
                        <LibraryBookItem
                            key={book.id}
                            id={book.id}
                            name={book.name}
                            description={book.description}
                            imageName={book.imageName}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default LibraryPage;