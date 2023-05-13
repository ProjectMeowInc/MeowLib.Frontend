import React, {useContext} from 'react';
import styles from "./loadingLayout.module.css"
import {Outlet} from "react-router-dom";
import {LoadingContext} from "../../context/LoadingContext";

const LoadingLayout = () => {

    const {loadingPercent} = useContext(LoadingContext)

    return (
        <>
            <div style={{width: `${loadingPercent}%`}} className={styles.loading}>

            </div>
            <div>
                <Outlet/>
            </div>
        </>
    );
};

export default LoadingLayout;