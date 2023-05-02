import React, {useState} from 'react';
import styles from "./authPage.module.css"
import {UserService} from "../../services/UserService";
import {ErrorTypesEnum, IError} from "../../services/models/IError";

const AuthPage = () => {

    const [isLoginPage, setIsLoginPage] = useState<boolean>(true)

    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<IError | null>(null)

    async function ClickHandler (login: string, password: string, isLogin: boolean): Promise<void> {
        if(isLogin) {
            await UserService.authorization({login, password})
        }
        else{
            const error = await UserService.registration({login, password});
            if(!error) {
                return
            }

            //TODO: Сделать обработку критических ошибок

            if (error.errorType === ErrorTypesEnum.Critical) {
                alert("Critical error")
                return
            }
            setError(error)
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
               <div className={styles.modal_wrapper}>
                   <div className={styles.header}>
                       <img src="/img/homeIcon.png" alt=""/>
                       <p onClick={() => setIsLoginPage(true)} className={isLoginPage? styles.active : styles.none_active}>Вход</p>
                       <p onClick={() => setIsLoginPage(false)} className={!isLoginPage ? styles.active : styles.none_active}>Регистрация</p>
                   </div>
                   <hr className={styles.separator}/>

                   {isLoginPage
                       ? <p className={styles.login}>Вход через логин и пароль</p>
                       : <p className={styles.login}>Регистрация через логин и пароль</p>
                   }

                   <hr className={styles.separator}/>

                   <input onChange={(ctx) => setLogin(ctx.target.value)} className={styles.input} type="text" placeholder={"Введите логин"}/>
                   <input onChange={(ctx) => setPassword(ctx.target.value)} className={styles.input} type="password" placeholder={"Введите пароль"}/>

                   <hr className={styles.separator}/>

                   {error && (
                       <p>{error.displayMessage}</p>
                   )}

                   <button onClick={async () => ClickHandler(login, password, isLoginPage)} className={styles.button}>Войти</button>
               </div>

            </div>
        </div>
    );
};

export default AuthPage;