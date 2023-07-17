import React from 'react';
import styles from "./userPage.module.css";
import Menu from "./UI/Menu/Menu";
import LibraryList from "./UI/LibraryList/LibraryList";
import User from "./UI/User/User";

const UserPage = () => {

    return (
        <div className={styles.wrapper}>
            <User/>

            <div className={styles.page}>
                <Menu/>
                <LibraryList/>
            </div>
        </div>
    );
};

export default UserPage;