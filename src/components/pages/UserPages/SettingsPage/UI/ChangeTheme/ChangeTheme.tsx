import React from 'react';
import styles from "./changeTheme.module.css"
import ThemeItem from "../ThemeItem/ThemeItem";

const ChangeTheme = () => {

    return (
        <div className={styles.themes}>
            <h1>Смена темы</h1>
            <div className={styles.select}>
                <ThemeItem newTheme={"white"} text={"Светлая"}/>
                <ThemeItem newTheme={"black"} text={"Тёмная"}/>
            </div>
        </div>
    );
};

export default ChangeTheme;