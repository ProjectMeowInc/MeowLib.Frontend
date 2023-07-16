import React, {useState} from 'react';
import styles from "./authPage.module.css"
import {TokenService} from "../../../services/TokenService";
import {AlertService} from "../../../services/AlertService";
import {AuthService} from "../../../services/AuthService";
import {RedirectService} from "../../../services/RedirectService";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";

const AuthPage = () => {

    const [isLoginPage, setIsLoginPage] = useState<boolean>(true)
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLongSession, setIsLongSession] = useState<boolean>(false)

    async function ClickHandler (login: string, password: string, isLogin: boolean): Promise<void> {
        if(isLogin) {
            const authorizationResult = await AuthService.authorizationAsync({login, password, isLongSession})

            if (authorizationResult.tryCatchError()) {
                return
            }

            const tokens = authorizationResult.unwrap()

            TokenService.setAccessToken(tokens.accessToken)
            TokenService.setRefreshToken(tokens.refreshToken)

            const accessTokenData = TokenService.parseAccessToken(tokens.accessToken)

            if(accessTokenData === null) {
               return AlertService.errorMessage("Ошибка авторизации")
            }

            AlertService.successMessage("Вы успешно авторизовались")

            return RedirectService.delayRedirect("/")
        }
        else {
            const registrationResult = await AuthService.registrationAsync({login, password})

            if (registrationResult.tryCatchError()) {
                return
            }

            AlertService.successMessage("Вы успешно зарегистрировались")
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

                   <Input text={"test"} validateFunction={(value) => {
                       return value.length > 10
                   }}/>

                   <hr className={styles.separator}/>

                   {
                       !isLoginPage
                           ? <></>
                           : <label className={styles.label}>
                               <input onClick={() => setIsLongSession(prevState => !prevState)} type="checkbox"/>
                               <p>Запомнить меня</p>
                           </label>
                   }

                   <Button
                       styles={{marginTop: 25}}
                       lockFunction={async () => await ClickHandler(login, password, isLoginPage)}
                   >
                        Отправить
                   </Button>
               </div>

            </div>
        </div>
    );
};

export default AuthPage;