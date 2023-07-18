import React, {useContext} from 'react';
import MenuItem from "../MenuItem/MenuItem";
import styles from "./menu.module.css"
import {AuthorizationContext} from "../../../../context/AuthorizationContext";

const Menu = () => {

    const {user} = useContext(AuthorizationContext)

    return (
        <div className={styles.menu}>
            <MenuItem text={"Библиотека"} path={""} />
            <MenuItem text={"Избранное"} path={"favorites"}/>
            {user && user.hasAdminAccess() && (
                    <MenuItem text={"Админ панель"} path={"/admin"}/>
                )
            }
        </div>
    );
};

export default Menu;