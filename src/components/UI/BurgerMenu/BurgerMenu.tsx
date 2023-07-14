import React, {useEffect, useState} from 'react';
import styles from "./burgerMenu.module.css"
import {IAccessTokenData} from "../../../services/models/DTO/ITokenModels";
import {TokenService} from "../../../services/TokenService";
import {UserRolesEnum} from "../../../services/models/DTO/IUserModels";
import {Link} from "react-router-dom";
import {RedirectService} from "../../../services/RedirectService";

const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [userData, setUserData] = useState<IAccessTokenData | null>(null)

    useEffect(() => {
        TokenService.getAccessTokenAsync().then(getAccessTokenResult => {
            if (getAccessTokenResult.tryCatchError()) {
                return
            }

            const accessTokenData = TokenService.parseAccessToken(getAccessTokenResult.unwrap())
            if (!accessTokenData) {
                return RedirectService.redirectToLogin()
            }

            setUserData(accessTokenData)
        })
    }, [])

    return (
        <div className={styles.burger_menu} onClick={() => setIsOpen(!isOpen)}>
            <div className={styles.btn}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={isOpen ? styles.menu_active : styles.menu}>
                {userData !== null
                    ? <div>
                        <p className={styles.login}>{userData.login}</p>
                        <p className={styles.list_item}>Избранное</p>
                    </div>
                    : <Link to={"/login"} className={styles.list_item}>Вход или регистрация</Link>

                }
                <Link to={"/books"} className={styles.list_item}>Библиотека</Link>

                {
                    (userData && userData.userRole === UserRolesEnum.Admin) || (userData && userData.userRole === UserRolesEnum.Moderator)
                        ? <Link to={"/admin"} className={styles.list_item} >Админ панель</Link>
                        : <></>
                }

            </div>
        </div>
    );
};

export default BurgerMenu;