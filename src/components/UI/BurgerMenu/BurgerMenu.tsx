import React, {useContext, useState} from 'react';
import styles from "./burgerMenu.module.css"
import {Link} from "react-router-dom";
import {AuthorizationContext} from "../../../context/AuthorizationContext";

const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {user} = useContext(AuthorizationContext)

    return (
        <div className={styles.burger_menu} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.btn}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={isOpen ? styles.menu_active : styles.menu}>
                {
                    user
                    ? <div>
                        <p className={styles.login}>{user.login}</p>
                        <p className={styles.list_item}>Избранное</p>
                    </div>
                    : <Link to={"/login"} className={styles.list_item}>Вход или регистрация</Link>

                }
                <Link to={"/books"} className={styles.list_item}>Библиотека</Link>

                {
                    user && user.hasAdminAccess() &&
                        <Link to={"/admin"} className={styles.list_item}>Админ панель</Link>
                }

            </div>
        </div>
    );
};

export default BurgerMenu;