import React, {useState} from 'react';
import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";
import {AuthService} from "../../../../../services/AuthService";
import {TokenService} from "../../../../../services/TokenService";
import {RedirectService} from "../../../../../services/RedirectService";
import styles from "./authorizationForm.module.css"
import Checkbox from "../../../../UI/Checkbox/Checkbox";

const AuthorizationForm = () => {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLongSession, setIsLongSession] = useState<boolean>(false)

    async function SubmitHandler(login: string, password: string, isLongSession: boolean): Promise<void> {
        const authorizationResult = await AuthService.authorizationAsync({
            login,
            password,
            isLongSession
        })

        if (authorizationResult.tryCatchError()) {
            return
        }

        const loginData = authorizationResult.unwrap();
        TokenService.setAccessToken(loginData.accessToken)
        TokenService.setRefreshToken(loginData.refreshToken)

        return RedirectService.delayRedirectToIndexPage()
    }

    return (
        <div>

            <p className={styles.header_text}>Вход через логин и пароль</p>

            <Input
                onChange={(value) => setLogin(value)}
                text={"Логин"}
                placeholder={"Введите логин"}
                isSilentInput={false}
                styles={{marginTop: 20}}
            />

            <Input
                onChange={(value) => setPassword(value)}
                text={"Пароль"}
                placeholder={"Введите пароль"}
                isSilentInput={true}
                styles={{marginTop: 20}}
            />

            <Checkbox
                text={"Запомнить меня"}
                onClick={(newState) => setIsLongSession(newState)}
            />

            <Button
                styles={{marginTop: 25}}
                lockFunction={async () => await SubmitHandler(login, password, isLongSession)}
            >
                Отправить
            </Button>
        </div>
    );
};

export default AuthorizationForm;

//!isLoginPage
//                         ? <></>
//                         : <label className={styles.label}>
//                             <input onClick={() => setIsLongSession(prevState => !prevState)} type="checkbox"/>
//                             <p>Запомнить меня</p>
//                         </label>