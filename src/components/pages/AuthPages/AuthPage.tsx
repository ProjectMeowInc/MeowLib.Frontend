import React from 'react';
import styles from "./authPage.module.css"
import AuthForm from "./UI/AuthForm/AuthForm";

const AuthPage = () => {

    return (
        <div className={styles.wrapper}>
            <AuthForm/>
        </div>
    );
};

export default AuthPage;