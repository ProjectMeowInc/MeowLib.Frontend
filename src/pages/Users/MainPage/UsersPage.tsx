import React, {useEffect, useState} from 'react';
import styles from "./userPage.module.css"
import {ErrorService} from "../../../services/ErrorService";
import {Link} from "react-router-dom";
import Preloader from "../../../components/preloader/preloader";
import {UserService} from "../../../services/UserService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {AlertService} from "../../../services/AlertService";
import {IUserDTO} from "../../../services/models/DTO/IUserModels";
import UserPageListItem from "../../../components/UserPage/UserPageListItem";

const UsersPage = () => {

    const [userList, setUserList] = useState<IUserDTO[] | null>(null)

    useEffect(() => {
        UserService.getUsers().then(response => {
            if (ErrorService.isError(response)) {
                if (response.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(response.displayMessage)
                }
                return AlertService.warningMessage(response.displayMessage)
            }

            setUserList(response)
        })
    }, [])


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление пользователями</h1>

            <Link to={"new"} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового тэга</p>
            </Link>

            {userList === null
                ? <Preloader/>
                : userList.length === 0
                    ? <p className={styles.empty}>Здесь пока ничего нет</p>
                    : userList.map(user => (
                        <UserPageListItem key={user.id} id={user.id} login={user.login} role={user.role}/>
                    ))
            }
        </div>
    );
};

export default UsersPage;