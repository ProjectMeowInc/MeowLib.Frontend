import React, {useEffect, useState} from 'react';
import styles from "./bookInfo.module.css"
import Button from "../../../../../UI/Button/Button";
import SelectStatusButton from "../SelectStatus/SelectStatusButton";
import {UserBookStatus} from "../../../../../../services/models/UserBookStatus";
import {UserFavoriteService} from "../../../../../../services/UserFavoriteService";
import {IUserFavorite} from "../../../../../../services/models/entities/UserFavoriteModels";

interface IBookInfoProps {
    bookId: number
    bookName: string
    imageName: string | null
}

const BookInfo = ({bookId, bookName, imageName}: IBookInfoProps) => {

    const [currentStatus, setCurrentStatus] = useState<UserBookStatus | null>(null)

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
    }, [])

    return (
        <div style={imageName !== null ? {backgroundImage:`linear-gradient(136deg, rgba(109, 91, 253, 0.80) 0%, rgba(255, 0, 229, 0.06) 49.87%, rgba(0, 0, 0, 0.69) 87.79%, #000 100%),
         url(https://localhost:7007/api/images/book/${imageName})`} : {}}
             className={styles.book_info}
        >
            <p>{bookName}</p>
            <div className={styles.buttons}>
                <Button children={"Продолжить читать"}/>
                <SelectStatusButton bookId={bookId} currentlySelected={currentStatus}/>
            </div>
        </div>
    );
};

export default BookInfo;