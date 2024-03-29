import React from 'react';
import styles from "./statusBar.module.css"
import {Link} from "react-router-dom";
import {useAuthorization} from "../../../../hooks/useAuthorization";

const StatusBar = () => {

    const {user} = useAuthorization()

    return (
        <div className={styles.status_bar}>
            <div className={styles.inner_wrapper}>
                <img className={styles.logo} src="/img/PurpleLogo.png" alt=""/>
                {
                    user !== null
                        ? <div className={styles.user_info}>
                            <div className={styles.avatar}>

                            </div>
                                <p className={styles.user_name}>{user.login}</p>
                            </div>
                        : <Link to={"/login"} className={styles.login}>Войти или зарегистрироваться</Link>
                }
            </div>
        </div>
    );
};

export default StatusBar;