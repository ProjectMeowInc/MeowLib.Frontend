import React from 'react';
import {IBookDTO} from "../../../services/models/DTO/IBookDTO";
import styles from "./libraryBookIten.module.css";

const LibraryBookItem = ({id, name, description, imageName}: IBookDTO) => {

    return (
        <div className={styles.book}>
            {
                imageName !== null
                    ? <div style={{backgroundImage: `url(https://localhost:7007/api/images/book/${imageName})`}} className={styles.img}></div>
                    : <div className={styles.img_not_found}> Нет изображения</div>
            }
            <p className={styles.book_caption}>{name}</p>
        </div>
    );
};

export default LibraryBookItem;