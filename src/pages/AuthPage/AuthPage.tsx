import React, {useContext, useState} from 'react';
import styles from "./authPage.module.css"
import {UserService} from "../../services/UserService";
import {ErrorTypesEnum} from "../../services/models/IError";
import {ErrorService} from "../../services/ErrorService";
import {TokenService} from "../../services/TokenService";
import {UserRolesEnum} from "../../services/models/DTO/IUserModels";
import {useNavigate} from "react-router-dom";
import {AlertService} from "../../services/AlertService";
import {LoadingContext} from "../../context/LoadingContext";

const AuthPage = () => {

    const [isLoginPage, setIsLoginPage] = useState<boolean>(true)

    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const {setLoadingPercent, startNewTask} = useContext(LoadingContext)

    async function ClickHandler (login: string, password: string, isLogin: boolean): Promise<void> {
        if(isLogin) {

            startNewTask()
            setLoadingPercent(50)

            const response = await UserService.authorization({login, password})

            if(ErrorService.isError(response)) {
                if(response.errorType === ErrorTypesEnum.Critical) {
                    //Пока alert потом можно это логировать
                    return AlertService.errorMessage(response.displayMessage)
                }
                return AlertService.warningMessage(response.displayMessage)
            }

            TokenService.setAccessToken(response.accessToken)

            const token = TokenService.parseToken(response.accessToken)

            if(token === null) {
               return AlertService.errorMessage("Ошибка авторизации")
            }

            AlertService.successMessage("Вы успешно авторизовались")

            setLoadingPercent(100)

            if(token.role === UserRolesEnum.Moderator || token.role === UserRolesEnum.Admin) {
                return navigate("/admin")
            }
        }
        else {
            const error = await UserService.registration({login, password});
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

                   <button onClick={async () => ClickHandler(login, password, isLoginPage)} className={styles.button}>Отправить</button>
               </div>

            </div>
        </div>
    );
};

export default AuthPage;