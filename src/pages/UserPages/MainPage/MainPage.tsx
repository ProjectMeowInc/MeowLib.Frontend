import React, {useEffect, useState} from 'react';
import styles from "./mainPage.module.css";
import {IBookDTO} from "../../../services/models/DTO/IBookDTO";
import {BookService} from "../../../services/BookService";
import BookItemRecentlyAdded from "../../../components/BookItemRecentlyAdded/BookItemRecentlyAdded";
import BookItem from "../../../components/BookItem/BookItem";

const MainPage = () => {

    const [books, setBooks] = useState<IBookDTO[] | null>(null)

    useEffect(() => {
        BookService.getBooksAsync().then(getBooksResult => {
            if (getBooksResult.tryCatchError()) {
                return
            }

            const books = getBooksResult.unwrap()

            return setBooks(books.items)
        })

    }, [])

    return (
        <div>
            <div className={styles.main}>
                <div className={styles.main_left}>
                    <p>Дарим замуррчательное настроение</p>
                </div>
                <div className={styles.main_right}>

                    <p>Недавно добавленные</p>

                    <div className={styles.books}>
                        {
                            books && books.map(book => (
                                <BookItemRecentlyAdded key={book.id} id={book.id} name={book.name} description={book.description} imageName={book.imageName}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <h1 className={styles.update_caption}>Последние обновления</h1>

                <div className={styles.last_updates}>
                    {
                        books && books.map(book => (
                            <BookItem key={book.id} id={book.id} name={book.name} description={book.description} imageName={book.imageName}/>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default MainPage;