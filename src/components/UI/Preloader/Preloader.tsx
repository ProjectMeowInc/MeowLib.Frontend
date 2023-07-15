import React from 'react';
import styles from "./preloader.module.css"

const Preloader = () => {
    return (
        <div className={styles.lds_roller}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Preloader;