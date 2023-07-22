import React from 'react';
import styles from "./themeItem.module.css";
import {Themes} from "../../../../../../services/settings/UserSettings";
import {useSettings} from "../../../../../../hooks/useSettings";

interface IThemeItemProps {
    newTheme: Themes
    text: string
}

const ThemeItem = ({text, newTheme}: IThemeItemProps) => {

    const {theme, setThemes} = useSettings()

    return (
        <div onClick={() => setThemes(newTheme)}
            className={newTheme === theme ? styles.active : styles.none}>
            {text}
        </div>
    );
};

export default ThemeItem;