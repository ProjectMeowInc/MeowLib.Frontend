import React from 'react';
import styles from "./authorListItem.module.css"
import {IAuthorDTO} from "../../services/models/DTO/IAuthorModels";
import {AuthorServices} from "../../services/AuthorServices";
import {AlertService} from "../../services/AlertService";
import {useNavigate} from "react-router-dom";

const AuthorListItem = ({id, name}: IAuthorDTO) => {

    const navigate = useNavigate()

    function UpdateHandler () {

        const newName = prompt("Введите имя")

        if (newName === null) {
            return AlertService.warningMessage("Вы не указали имя автора")
        }

        AuthorServices.updateAuthor(id, newName).then(err => {
            if (err !== null) {
                return AlertService.errorMessage(err.displayMessage)
            }

            AlertService.successMessage("Автор был успешно обновлён")

            navigate(0)
        })
    }

    function DeleteHandler () {
        AuthorServices.deleteAuthor(id).then(err => {
            if (err !== null) {
                return AlertService.errorMessage(err.displayMessage)
            }

            AlertService.successMessage("Автор был успешно удалён")

            navigate(0)
        })
    }

    return (
        <div className={styles.item}>
            <div className={styles.left_side}>
                <p className={styles.id}>{id}</p>
                <p>{name}</p>
            </div>

            <div className={styles.right_side}>
                <p onClick={UpdateHandler}>Изменить</p>
                <p onClick={DeleteHandler}>Удалить</p>
            </div>
        </div>
    );
};

export default AuthorListItem;