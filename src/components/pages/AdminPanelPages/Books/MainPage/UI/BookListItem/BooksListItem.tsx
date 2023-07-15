import React from 'react';
import {AlertService} from "../../../../../../../services/AlertService";
import styles from "./booksListItem.module.css";
import {Link} from "react-router-dom";
import {IBookDTO} from "../../../../../../../services/models/DTO/IBookDTO";
import {BookService} from "../../../../../../../services/BookService";

const BooksListItem = ({id, name}: IBookDTO) => {
    function DeleteHandler () {
        BookService.deleteBookAsync(id).then(deleteBookResult => {
            if (deleteBookResult.tryCatchError()) {
                return
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
