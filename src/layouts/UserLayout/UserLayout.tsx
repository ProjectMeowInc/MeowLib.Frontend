import React from 'react';
import BurgerMenu from "../../components/UI/BurgerMenu/BurgerMenu";
import styles from "./userLayout.module.css"
import {Outlet} from "react-router-dom";
import Footer from "../../components/UI/Footer/Footer";

const UserLayout = () => {
    return (
        <div>
            <div className={styles.block}>
                <BurgerMenu/>
                <img src="/img/LogoBlack.png" alt=""/>
            </div>

            <div className={styles.wrapper}>
                <Outlet/>
            </div>

            <Footer/>
        </div>
    );
};

export default UserLayout;