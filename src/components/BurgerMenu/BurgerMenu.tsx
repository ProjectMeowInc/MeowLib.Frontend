import React, {useState} from 'react';
import styles from "./burgerMenu.module.css"
import {TokenService} from "../../services/TokenService";

const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className={styles.burger_menu} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.btn}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={isOpen ? styles.menu : styles.menu_active}>
                <p className={styles.login}>LxCx</p>
                <div className={styles.list}>
                    <p className={styles.list_item}>Избранное</p>
                    <p className={styles.list_item}>Библиотека</p>

                </div>

            </div>
        </div>
    );
};

export default BurgerMenu;