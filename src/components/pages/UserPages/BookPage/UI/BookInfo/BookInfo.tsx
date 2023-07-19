import React from 'react';
import styles from "./bookInfo.module.css"
import Button from "../../../../../UI/Button/Button";

interface IBookInfoProps {
    bookName: string
    imageName: string | null
}

const BookInfo = ({bookName, imageName}: IBookInfoProps) => {

    return (
        <div style={imageName !== null ? {backgroundImage:`linear-gradient(136deg, rgba(109, 91, 253, 0.80) 0%, rgba(255, 0, 229, 0.06) 49.87%, rgba(0, 0, 0, 0.69) 87.79%, #000 100%),
         url(https://localhost:7007/api/images/book/${imageName})`} : {}}
             className={styles.book_info}
        >
            <p>{bookName}</p>
            <div className={styles.buttons}>
                <Button children={"Продолжить читать"}/>
                <img className={styles.bookmark} src="/img/bookmark.png" alt=""/>
            </div>
        </div>
    );
};

export default BookInfo;