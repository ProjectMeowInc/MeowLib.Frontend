import React from 'react';
import styles from "./authorListItem.module.css"
import {IAuthorDTO} from "../../../../../../services/models/DTO/IAuthorModels";
import {AuthorServices} from "../../../../../../services/AuthorServices";
import {AlertService} from "../../../../../../services/AlertService";
import {Link} from "react-router-dom";
import {RedirectService} from "../../../../../../services/RedirectService";

const AuthorListItem = ({id, name}: IAuthorDTO) => {

    function DeleteHandler () {
        AuthorServices.deleteAuthorAsync(id).then(deleteAuthorResult => {
            if (deleteAuthorResult.tryCatchError()) {
                return
            }

            AlertService.successMessage("Автор был успешно удалён")

            RedirectService.delayReloadPage()
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

export default AuthorListItem;