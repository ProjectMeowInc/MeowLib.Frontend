import React, {useEffect, useState} from 'react';
import styles from "./mainPage.module.css";
import {IBookDTO} from "../../../services/models/DTO/IBookDTO";
import {BookService} from "../../../services/BookService";
import BookItemV1 from "../../../components/BookItemV1/BookItemV1";
import BookItemV2 from "../../../components/BookItemV2/BookItemV2";

const MainPage = () => {

    const [books, setBooks] = useState<IBookDTO[] | null>()

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
                                <BookItemV1 key={book.id} id={book.id} name={book.name} description={book.description} imageName={book.imageName}/>
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
                            <BookItemV2 key={book.id} id={book.id} name={book.name} description={book.description} imageName={book.imageName}/>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default MainPage;