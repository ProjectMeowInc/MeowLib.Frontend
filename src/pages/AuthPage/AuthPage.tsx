import React, {useState} from 'react';
import styles from "./authPage.module.css"

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState<Boolean>(true)

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

                   <input className={styles.input} type="text" placeholder={"Введите логин"}/>
                   <input className={styles.input} type="password" placeholder={"Введите пароль"}/>

                   <hr className={styles.separator}/>

                   <button className={styles.button}>Войти</button>
               </div>

            </div>
        </div>
    );
};

export default AuthPage;