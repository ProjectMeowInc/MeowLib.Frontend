import React from 'react';
import styles from "./userLayout.module.css"
import {Outlet} from "react-router-dom";
import StatusBar from "./UI/StatusBar/StatusBar";
import Menu from "./UI/Menu/Menu";

const UserLayout = () => {
    return (
        <div>
            <StatusBar/>

            <div className={styles.wrapper}>
                <Menu/>
                <div className={styles.outlet}>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;