import React, {useEffect, useState} from 'react';
import styles from "./burgerMenu.module.css"
import {IAccessTokenData} from "../../services/models/DTO/ITokenModels";
import {TokenService} from "../../services/TokenService";

const BurgerMenu = () => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [userData, setUserData] = useState<IAccessTokenData | null>(null)

    useEffect(() => {

        let accessToken: string

        async function getAndSetAccessToken() {
            const result = await TokenService.getAccessTokenAsync()

            if (result !== null) {
                accessToken = result
            }
        }

        getAndSetAccessToken().then(() => {
            const accessTokenData = TokenService.parseAccessToken(accessToken)
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
            <div className={isOpen ? styles.menu : styles.menu_active}>
                {userData !== null
                    ? <div>
                        <p className={styles.login}>{userData.login}</p>
                        <p className={styles.list_item}>Избранное</p>
                    </div>
                    : <div className={styles.list}>
                        <p className={styles.list_item}>Вход</p>
                        <p className={styles.list_item}>Регистрация</p>
                    </div>
                }
                <p className={styles.list_item}>Библиотека</p>

            </div>
        </div>
    );
};

export default BurgerMenu;