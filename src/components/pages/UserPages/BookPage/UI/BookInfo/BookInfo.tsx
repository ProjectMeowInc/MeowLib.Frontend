import React, {useEffect, useState} from 'react';
import styles from "./bookInfo.module.css"
import Button from "../../../../../UI/Button/Button";
import SelectStatusButton from "../SelectStatus/SelectStatusButton";
import {UserBookStatus} from "../../../../../../services/models/UserBookStatus";
import {UserFavoriteService} from "../../../../../../services/UserFavoriteService";
import {BookmarkService} from "../../../../../../services/BookmarkService";
import {IBookmark} from "../../../../../../services/models/entities/BookmarkModels";
import {RedirectService} from "../../../../../../services/RedirectService";
import {ChapterService} from "../../../../../../services/ChapterService";
interface IBookInfoProps {
    bookId: number
    bookName: string
    imageName: string | null
}

const BookInfo = ({bookId, bookName, imageName}: IBookInfoProps) => {

    const [currentStatus, setCurrentStatus] = useState<UserBookStatus | null>(null)
    const [bookmark, setBookmark] = useState<IBookmark | null>(null)
    const [firstChapterId, setFirstChapterId] = useState<number>()

    useEffect(() => {
        UserFavoriteService.getUserFavoriteByBookId(bookId).then(getUserFavoriteResult => {
            if (getUserFavoriteResult.tryCatchError()) {
                return
            }

            const status = getUserFavoriteResult.unwrap()

            if (status) {
                return setCurrentStatus(status.status)
            }

            setCurrentStatus(null)
        })

        BookmarkService.getBookmarkByBookIdAsync(bookId).then(getBookmarkResult => {
            if (getBookmarkResult.hasError()) {
                return
            }

            setBookmark(getBookmarkResult.unwrap())
        })

        ChapterService.getChaptersAsync(bookId).then(getChaptersResult => {
            if (getChaptersResult.tryCatchError()) {
                return
            }

            const chapters = getChaptersResult.unwrap()
            const firstChapterNumber = Math.min(...chapters.map(chapter => chapter.id))

            setFirstChapterId(firstChapterNumber)
        })
    }, [])

    function ReadButtonClickHandler() {
        if (bookmark) {
            return RedirectService.redirect(`/books/${bookId}/chapter/${bookmark.chapterId}`)
        }

        return RedirectService.redirect(`/books/${bookId}/chapter/${firstChapterId}`)
    }

    return (
        <div style={imageName !== null ? {backgroundImage:`linear-gradient(136deg, rgba(109, 91, 253, 0.80) 0%, rgba(255, 0, 229, 0.06) 49.87%, rgba(0, 0, 0, 0.69) 87.79%, #000 100%),
         url(https://localhost:7007/api/images/book/${imageName})`} : {background:"linear-gradient(136deg, rgba(109, 91, 253, 0.80) 0%, rgba(255, 0, 229, 0.06) 49.87%, rgba(0, 0, 0, 0.69) 87.79%, #000 100%)"}}
             className={styles.book_info}
        >
            <p>{bookName}</p>

            {imageName === null
                ? <p>Изображения пока нет</p>
                : <></>
            }

            <div className={styles.buttons}>
                <Button onClick={ReadButtonClickHandler} children={bookmark !== null ? "Продолжить читать" : "Начать читать"}/>
                <SelectStatusButton
                    bookId={bookId}
                    currentlySelected={currentStatus}
                    onStatusChanged={(newStatus) => setCurrentStatus(newStatus)}
                />
            </div>
        </div>
    );
};

export default BookInfo;