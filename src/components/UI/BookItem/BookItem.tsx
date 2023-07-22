import React from 'react';
import {IBookDto} from "../../../services/models/entities/BookModels";
import styles from "./bookItem.module.css"

const BookItem = ({name, imageName}:IBookDto) => {

    return (
        <div className={styles.book}>
            {imageName !== null
                ? <div style={{backgroundImage: `url(https://localhost:7007/api/images/book/${imageName})`}} className={styles.img}>

                </div>
                : <p className={styles.img}>Нет изображения</p>
            }
            <div>
                <p className={styles.caption}>{name}</p>
            </div>
        </div>
    );
};

export default BookItem;