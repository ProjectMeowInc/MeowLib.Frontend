import React, {useState} from 'react';
import styles from "./authPage.module.css"
import {registration} from "../../apiRequests/AuthRequests";
import {IError} from "../../models/Responses";

async function ClickHandler (login: string, password: string, isLogin: boolean): Promise<undefined | IError> {
    if(isLogin) {
        return undefined
    }
    else{
       return await registration(login, password);
    }
}

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [response, setResponse] = useState<IError| undefined>(undefined)

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
               <div className={styles.modal_wrapper}>
                   <div className={styles.header}>
                       <img src="/img/homeIcon.png" alt=""/>
                       <p onClick={() :void => setIsLogin(true)} className={isLogin? styles.active : styles.none_active}>Вход</p>
                       <p onClick={() :void => setIsLogin(false)} className={!isLogin ? styles.active : styles.none_active}>Регистрация</p>
                   </div>
                   <hr className={styles.separator}/>

                   {isLogin ?
                       <p className={styles.login}>Вход через логин и пароль</p> :
                       <p className={styles.login}>Регистрация через логин и пароль</p>
                   }

                   <hr className={styles.separator}/>

                   <input onChange={(ctx) :void => setLogin(ctx.target.value)} className={styles.input} type="text" placeholder={"Введите логин"}/>
                   <input onChange={(ctx) :void => setPassword(ctx.target.value)} className={styles.input} type="password" placeholder={"Введите пароль"}/>

                   <hr className={styles.separator}/>

                   <p>{response?.displayMessage}</p>

                   <button onClick={async () => setResponse(await ClickHandler(login, password, isLogin))} className={styles.button}>Войти</button>
               </div>

            </div>
        </div>
    );
};

export default AuthPage;