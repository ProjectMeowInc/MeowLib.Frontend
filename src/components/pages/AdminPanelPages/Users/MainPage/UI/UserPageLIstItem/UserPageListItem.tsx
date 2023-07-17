import React from 'react';
import {Link} from "react-router-dom";
import styles from "./userPage.module.css";
import {IUserDto} from "../../../../../../../services/models/entities/UserModels";

const UserPageListItem = ({id, login, role}: IUserDto) => {

    return (
        <div className={styles.item} data-tooltip-id={"my-tooltip"}>
            <div className={styles.left_side}>
                <p className={styles.id}>{id}</p>
                <p>{login}</p>
            </div>

            <p>{role}</p>

            <div className={styles.right_side}>
                <Link to={`${id}/edit`}>Изменить</Link>
                <p>Удалить</p>
            </div>
        </div>
    );
};

export default UserPageListItem;