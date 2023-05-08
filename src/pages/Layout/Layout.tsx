import React from 'react';
import styles from "./layout.module.css";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.logo}>MeowLib</p>
                    <p>someName</p>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;