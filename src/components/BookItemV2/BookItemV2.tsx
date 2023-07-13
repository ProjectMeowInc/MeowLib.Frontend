import React from 'react';
import {IBookDTO} from "../../services/models/DTO/IBookDTO";
import styles from "./bookItemV2.module.css"

const BookItemV2 = ({id, name, description, imageName}:IBookDTO) => {

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

export default BookItemV2;