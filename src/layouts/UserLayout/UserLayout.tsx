import React from 'react';
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import styles from "./userLayout.module.css"
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer/Footer";

const UserLayout = () => {
    return (
        <div>
            <div className={styles.block}>
                <BurgerMenu/>
                <img src="/img/LogoBlack.png" alt=""/>
            </div>

            <Outlet/>

            <Footer/>
        </div>
    );
};

export default UserLayout;