import React, {useEffect, useState} from 'react';
import {IChapterDto} from "../../../../../../services/models/entities/ChapterModels";
import {ChapterService} from "../../../../../../services/ChapterService";
import BookChapter from "../BookChapter/BookChapter";
import styles from "./bookChapters.module.css"

interface IBookChaptersProps {
    bookId: number
}

const BookChapters = ({bookId}:IBookChaptersProps) => {

    const [chapters, setChapters] = useState<IChapterDto[] | null>(null)

    useEffect(() => {
        ChapterService.getChaptersAsync(bookId).then(getChaptersResult => {
            if (!getChaptersResult.hasError()) {
                setChapters(getChaptersResult.unwrap())
            }
        })
    }, [bookId])

    return (
        <div className={styles.chapters}>
            {chapters !== null
                ? chapters.map(chapter => (
                    <BookChapter nameChapter={chapter.name} releaseDate={chapter.releaseDate}/>
                ))
                : <p>Здесь пока ничего нет</p>

            }
        </div>
    );
};

export default BookChapters;