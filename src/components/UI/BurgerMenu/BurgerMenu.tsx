import React, {useState} from 'react';
import styles from "./burgerMenu.module.css"
import BurgerMenuButton from "./UI/BurgerMenuButton/BurgerMenuButton";
import BurgerMenuItem from "./UI/BurgerMenuItem/BurgerMenuItem";
import {useAuthorization} from "../../../hooks/useAuthorization";

const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {user} = useAuthorization()

    return (
        <div className={styles.burger_menu} onClick={() => setIsOpen(!isOpen)}>

            <BurgerMenuButton/>

            <div className={isOpen ? styles.menu_active : styles.menu}>
                {
                    user
                    ? <div>
                        <BurgerMenuItem text={user.login} link={"user"}/>
                    </div>
                    : <BurgerMenuItem text={"Вход или регистрация"} link={"/login"}/>

                }

                <BurgerMenuItem text={"Библиотека"} link={"/books"}/>

                {
                    user && user.hasAdminAccess() &&
                        <BurgerMenuItem text={"Админ панель"} link={"/admin"}/>
                }

            </div>
        </div>
    );
};

export default BurgerMenu;