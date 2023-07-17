import React from 'react';
import {IBookDto} from "../../../services/models/entities/BookModels";
import styles from "./libraryBookIten.module.css";
import {Link} from "react-router-dom";

const LibraryBookItem = ({id, name, imageName}: IBookDto) => {

    return (
        <Link to={`/books/${id}`} className={styles.book}>
            {
                imageName !== null
                    ? <div style={{backgroundImage: `url(https://localhost:7007/api/images/book/${imageName})`}} className={styles.img}></div>
                    : <div className={styles.img_not_found}> Нет изображения</div>
            }
            <p className={styles.book_caption}>{name}</p>
        </Link>
    );
};

export default LibraryBookItem;