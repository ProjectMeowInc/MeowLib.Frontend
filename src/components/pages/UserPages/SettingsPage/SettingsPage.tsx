import React from 'react';
import styles from "./settings.module.css"
import LayoutContentItem from "../../../UI/LayoutContentItem/LayoutContentItem";
import ChangePassword from "./UI/ChangePassword/ChangePassword";
import ChangeTheme from "./UI/ChangeTheme/ChangeTheme";
import {useAuthorization} from "../../../../hooks/useAuthorization";

const SettingsPage = () => {

    const {user} = useAuthorization()

    return (
        <div className={styles.settings}>
            <LayoutContentItem>
                {user && (
                    <ChangePassword/>
                )}
            </LayoutContentItem>

            <LayoutContentItem>
                <ChangeTheme/>
            </LayoutContentItem>
        </div>

    );
};

export default SettingsPage;