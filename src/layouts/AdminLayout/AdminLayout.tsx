import React, {useContext} from 'react';
import styles from "./adminLayout.module.css";
import {Outlet} from "react-router-dom";
import {RedirectService} from "../../services/RedirectService";
import {AuthorizationContext} from "../../context/AuthorizationContext";

const AdminLayout = () => {
    const {user} = useContext(AuthorizationContext)

    if (user && !user.hasAdminAccess()) {
        RedirectService.redirectToLogin()
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p onClick={() => RedirectService.redirect("/admin")} className={styles.logo}>MeowLib</p>
                    <p className={styles.name}>{user && user.login}</p>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminLayout;