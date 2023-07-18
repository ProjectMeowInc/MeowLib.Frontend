import React, {useContext} from 'react';
import styles from "./settings.module.css"
import {AuthorizationContext} from "../../../../context/AuthorizationContext";
import LayoutContentItem from "../../../UI/LayoutContentItem/LayoutContentItem";
import ChangePassword from "./UI/ChangePassword/ChangePassword";
import ChangeTheme from "./UI/ChangeTheme/ChangeTheme";

const SettingsPage = () => {

    const {user} = useContext(AuthorizationContext)

    return (
        <div className={styles.settings}>
            <LayoutContentItem style={{width: 40}}>
                {user && (
                    <ChangePassword/>
                )}
            </LayoutContentItem>

            <LayoutContentItem style={{width: 40}}>
                <ChangeTheme/>
            </LayoutContentItem>
        </div>

    );
};

export default SettingsPage;