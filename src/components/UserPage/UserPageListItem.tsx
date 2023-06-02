import React from 'react';
import {Link} from "react-router-dom";
import styles from "./userPage.module.css";
import {IUserDTO} from "../../services/models/DTO/IUserModels";

const UserPageListItem = ({id, login, role}: IUserDTO) => {

    return (
        <div className={styles.item} data-tooltip-id={"my-tooltip"}>
            <div className={styles.left_side}>
                <p className={styles.id}>{id}</p>
                <p>{login}</p>
            </div>

            <div className={styles.right_side}>
                <Link to={`${id}/edit`}>Изменить</Link>
                <p>Удалить</p>
            </div>
        </div>
    );
};

export default UserPageListItem;