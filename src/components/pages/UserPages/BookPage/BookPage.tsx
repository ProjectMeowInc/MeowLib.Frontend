import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IBook} from "../../../../services/models/DTO/IBookDTO";
import {RedirectService} from "../../../../services/RedirectService";
import {BookService} from "../../../../services/BookService";
import {IChapterDTO} from "../../../../services/models/DTO/IChapterDTO";
import {ChapterService} from "../../../../services/ChapterService";
import Preloader from "../../../UI/Preloader/Preloader";
import styles from "./bookPage.module.css"
import TagItem from "../../../UI/TagItem/TagItem";
import ChapterItem from "../../../UI/ChapterItem/ChapterItem";
import {AlertService} from "../../../../services/AlertService";
import SelectStatus from "./UI/SelectStatus/SelectStatus";

const BookPage = () => {
    const [book, setBook] = useState<IBook| null>(null)
    const [chapters, setChapters] = useState<IChapterDTO[] | null>(null)
    const params = useParams()
    const id = params.bookId

    useEffect(() => {
        if (id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        BookService.getBookAsync(parseInt(id)).then(getBookResult => {
            if (getBookResult.tryCatchError()) {
                return
            }

            setBook(getBookResult.unwrap())
        })

        ChapterService.getChaptersAsync(parseInt(id)).then(getChaptersResult => {
            if (getChaptersResult.tryCatchError()) {
                return
            }

            setChapters(getChaptersResult.unwrap())
        })

    }, [id])

    if (book === null) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                {
                    book.imageUrl !== null
                        ? <div className={styles.img} style={{backgroundImage: `url(https://localhost:7007/api/images/book/${book.imageUrl})`}}></div>
                        : <div className={styles.img_not_found}>Нет изображения</div>
                }

                <SelectStatus/>
            </div>
            <div className={styles.right}>
                <h1>{book.name}</h1>

                <p className={styles.author}>{book.author && book.author.name}</p>

                <p className={styles.caption}>Описание</p>
                <p className={styles.description}>{book.description}</p>

                <div className={styles.tags}>
                    {
                        book.tags.map(tag => (
                            <TagItem tagName={tag.name}/>
                        ))
                    }
                </div>

                <div className={styles.chapters}>
                    {
                        chapters && chapters.map(chapter => (
                            <ChapterItem
                                id={chapter.id}
                                name={chapter.name}
                                releaseDate={chapter.releaseDate}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default BookPage;