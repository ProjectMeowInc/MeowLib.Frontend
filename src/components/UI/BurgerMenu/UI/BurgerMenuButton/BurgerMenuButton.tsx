import React from 'react';
import styles from "./burgerMenuButton.module.css";

const BurgerMenuButton = () => {
    return (
        <div>
            <div className={styles.btn}>
                <span className={styles.span}></span>
                <span className={styles.span}></span>
                <span className={styles.span}></span>
            </div>
        </div>
    );
};

export default BurgerMenuButton;