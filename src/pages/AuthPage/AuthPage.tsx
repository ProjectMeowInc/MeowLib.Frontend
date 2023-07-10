import React, {useState} from 'react';
import styles from "./authPage.module.css"
import {ErrorTypesEnum} from "../../services/models/IError";
import {ErrorService} from "../../services/ErrorService";
import {TokenService} from "../../services/TokenService";
import {UserRolesEnum} from "../../services/models/DTO/IUserModels";
import {AlertService} from "../../services/AlertService";
import {AuthService} from "../../services/AuthService";
import {RedirectService} from "../../services/RedirectService";

const AuthPage = () => {

    const [isLoginPage, setIsLoginPage] = useState<boolean>(true)
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLongSession, setIsLongSession] = useState<boolean>(false)

    async function ClickHandler (login: string, password: string, isLogin: boolean): Promise<void> {
        if(isLogin) {

            const result = await AuthService.authorizationAsync({login, password, isLongSession})

            if(ErrorService.isError(result)) {
                if(result.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(result.displayMessage)
                }
                return AlertService.warningMessage(result.displayMessage)
            }

            TokenService.setAccessToken(result.accessToken)
            TokenService.setRefreshToken(result.refreshToken)

            const accessTokenData = TokenService.parseAccessToken(result.accessToken)

            if(accessTokenData === null) {
               return AlertService.errorMessage("Ошибка авторизации")
            }

            AlertService.successMessage("Вы успешно авторизовались")

            if(accessTokenData.userRole === UserRolesEnum.Moderator || accessTokenData.userRole === UserRolesEnum.Admin) {
                return RedirectService.redirect("/admin")
            }
        }
        else {
            const error = await AuthService.registrationAsync({login, password});
            if(error === null) {
                return AlertService.successMessage("Вы успешно зарегистрировались. Теперь вы можете авторизоваться")
            }

            if (error.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(error.displayMessage)
            }

            AlertService.warningMessage(error.displayMessage)
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

                   {
                       !isLoginPage
                           ? <></>
                           : <label className={styles.label}>
                               <input onClick={() => setIsLongSession(prevState => !prevState)} type="checkbox"/>
                               <p>Запомнить меня</p>
                           </label>
                   }

                   <button onClick={async () => ClickHandler(login, password, isLoginPage)} className={styles.button}>Отправить</button>
               </div>

            </div>
        </div>
    );
};

export default AuthPage;