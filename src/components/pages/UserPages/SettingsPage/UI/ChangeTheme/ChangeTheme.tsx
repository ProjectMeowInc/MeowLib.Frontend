import React, {useContext} from 'react';
import {SettingsContext} from "../../../../../../context/SettingsContext";
import styles from "./changeTheme.module.css"
import {Themes} from "../../../../../../services/settings/UserSettings";

const ChangeTheme = () => {

    const {theme, setThemes} = useContext(SettingsContext)

    function ChangeTheme(theme: Themes) {
        setThemes(theme)
    }

    return (
        <div className={styles.themes}>
            <h1>Смена темы</h1>
            <div className={styles.select}>
                <div onClick={() => ChangeTheme("white")}
                     className={theme === "white" ? styles.active : styles.none}
                >
                    Светлая
                </div>
                <div onClick={() => ChangeTheme("black")}
                     className={theme === "black" ? styles.active : styles.none}
                >
                    Тёмная
                </div>
            </div>
        </div>
    );
};

export default ChangeTheme;