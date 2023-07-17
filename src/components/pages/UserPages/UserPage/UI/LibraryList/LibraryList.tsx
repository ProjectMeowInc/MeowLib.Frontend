import React, {useEffect, useState} from 'react';
import styles from "./libraryList.module.css";
import LibraryBookItem from "../../../../../UI/LibraryBookItem/LibraryBookItem";
import {IUserBooksStatusDTO} from "../../../../../../services/models/DTO/IUserBooksStatusDTO";
import {UserBookStatus} from "../../../../../../services/models/UserBookStatus";
import {BookService} from "../../../../../../services/BookService";

const LibraryList = () => {

    const [userBooks, setUserBooks] = useState<IUserBooksStatusDTO[] | null>(null)
    const [bookStatus, setBookStatus] = useState<UserBookStatus>("InPlans")

    useEffect(() => {
        BookService.getBooksStatusAsync().then(getBooksStatus => {
            if (getBooksStatus.tryCatchError()) {
                return
            }

            setUserBooks(getBooksStatus.unwrap())
        })
    }, [])

    const filteredBooks =  userBooks && userBooks.filter(status => status.status === bookStatus)

    return (
        <div className={styles.list}>
            <div className={styles.status_block}>
                <p className={bookStatus === "InPlans" ? styles.status_active : styles.status}
                   onClick={() => setBookStatus("InPlans")}>В планах</p>

                <p className={bookStatus === "ReadingNow" ? styles.status_active : styles.status}
                   onClick={() => setBookStatus("ReadingNow")}>Читаю</p>

                <p className={bookStatus === "Favorite" ? styles.status_active : styles.status}
                   onClick={() => setBookStatus("Favorite")}>Избранное</p>

                <p className={bookStatus === "Read" ? styles.status_active : styles.status}
                   onClick={() => setBookStatus("Read")}>Прочитано</p>
            </div>

            <div className={styles.books}>
                {
                    filteredBooks && filteredBooks.length > 0 && filteredBooks[0].books.map(book => (
                        <LibraryBookItem id={book.id} name={book.name} description={book.description} imageName={book.imageName}/>
                    ))
                }
            </div>
        </div>
    );
};

export default LibraryList;