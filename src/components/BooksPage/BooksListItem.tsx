import React from 'react';
import {AlertService} from "../../services/AlertService";
import styles from "./booksListItem.module.css";
import {Link} from "react-router-dom";
import {IBookDTO} from "../../services/models/DTO/IBookDTO";
import {BookService} from "../../services/BookService";

const BooksListItem = ({id, name, description}: IBookDTO) => {
    function DeleteHandler () {
        BookService.deleteBook(id).then(err => {
            if (err !== null) {
                return AlertService.errorMessage(err.displayMessage)
            }

            return AlertService.successMessage("Книга была успешно удалена")
        })
    }

    return (
        <div className={styles.item}>
            <div className={styles.left_side}>
                <p className={styles.id}>{id}</p>
                <p>{name}</p>
            </div>

            <div className={styles.right_side}>
                <Link to={`${id}/edit`}>Изменить</Link>
                <p onClick={DeleteHandler}>Удалить</p>
            </div>
        </div>
    );
};

export default BooksListItem;
