import React, {useContext} from 'react';
import {AuthorizationContext} from "../../../../../../context/AuthorizationContext";
import Preloader from "../../../../../UI/Preloader/Preloader";
import styles from "./user.module.css"

const User = () => {

    const {user} = useContext(AuthorizationContext)

    if (user === null) {
        return (
            <Preloader/>
        )
    }

    return (
        <div className={styles.user_data}>
            <div className={styles.avatar}>

            </div>
            <div>
                <p className={styles.login}>{user.login}</p>
                <p className={styles.role}>{user.role}</p>
            </div>
        </div>
    );
};

export default User;