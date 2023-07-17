import React from 'react';
import styles from "./menu.module.css"

const Menu = () => {
    return (
        <div className={styles.menu}>
            <p className={styles.menu_item}>Списки</p>
            <p className={styles.menu_item}>Друзья</p>
        </div>
    );
};

export default Menu;