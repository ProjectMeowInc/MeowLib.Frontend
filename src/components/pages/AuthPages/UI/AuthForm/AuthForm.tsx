import React, {useState} from 'react';
import styles from "./authForm.module.css";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Separator from "../Separator/Separator";

const AuthForm = () => {

    const [isLoginPage, setIsLoginPage] = useState<boolean>(true)

    return (
        <div className={styles.form}>
            <div className={styles.header}>
                <img src="/img/homeIcon.png" alt=""/>
                <p onClick={() => setIsLoginPage(true)} className={isLoginPage? styles.active : styles.none_active}>Вход</p>
                <p onClick={() => setIsLoginPage(false)} className={!isLoginPage ? styles.active : styles.none_active}>Регистрация</p>
            </div>
            <Separator/>
            {
                isLoginPage
                    ? <AuthorizationForm/>
                    : <RegistrationForm/>
            }
        </div>
    );
};

export default AuthForm;