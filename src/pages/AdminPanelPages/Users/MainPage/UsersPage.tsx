import React, {useEffect, useState} from 'react';
import styles from "./userPage.module.css"
import Preloader from "../../../../components/preloader/preloader";
import {UserService} from "../../../../services/UserService";
import {IUserDTO} from "../../../../services/models/DTO/IUserModels";
import UserPageListItem from "../../../../components/UserPage/UserPageListItem";

const UsersPage = () => {

    const [userList, setUserList] = useState<IUserDTO[] | null>(null)

    useEffect(() => {
        UserService.getUsersAsync().then(getUserResult => {
            if (getUserResult.tryCatchError()) {
                return
            }

            setUserList(getUserResult.unwrap())
        })
    }, [])


    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление пользователями</h1>

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