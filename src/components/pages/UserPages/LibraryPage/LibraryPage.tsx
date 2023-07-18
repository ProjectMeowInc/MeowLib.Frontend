import React, {useEffect, useState} from 'react';
import styles from "./libraryPage.module.css";
import SearchInput from "../../../UI/SearchInput/SearchInput";
import {IBookDto} from "../../../../services/models/entities/BookModels";
import {BookService} from "../../../../services/BookService";
import LibraryBookItem from "../../../UI/LibraryBookItem/LibraryBookItem";
import LayoutContentItem from "../../../UI/LayoutContentItem/LayoutContentItem";

const LibraryPage = () => {

    const [books, setBooks] = useState<IBookDto[] | null>(null)

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
        <LayoutContentItem style={{width: 100}}>
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
        </LayoutContentItem>
    );
};

export default LibraryPage;