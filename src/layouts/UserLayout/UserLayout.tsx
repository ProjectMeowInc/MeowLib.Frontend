import React from 'react';
import styles from "./userLayout.module.css"
import StatusBar from "./UI/StatusBar/StatusBar";
import Menu from "./UI/Menu/Menu";
import {Outlet} from "react-router-dom";

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