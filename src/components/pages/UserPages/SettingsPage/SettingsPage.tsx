import React from 'react';
import styles from "./settings.module.css"
import ChangePassword from "./UI/ChangePassword/ChangePassword";
import ChangeTheme from "./UI/ChangeTheme/ChangeTheme";
import {useAuthorization} from "../../../../hooks/useAuthorization";
import LayoutContentColumn from "../../../UI/LayoutContentColumn/LayoutContentColumn";

const SettingsPage = () => {

    const {user} = useAuthorization()

    return (
        <div className={styles.settings}>
            {
                user && (
                    <LayoutContentColumn elements={[<ChangePassword/>]}/>
                )
            }

            <LayoutContentColumn elements={[<ChangeTheme/>]}/>
        </div>

    );
};

export default SettingsPage;