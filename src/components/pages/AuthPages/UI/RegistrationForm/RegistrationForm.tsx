import React, {useState} from 'react';
import Input from "../../../../UI/Input/Input";
import Button from "../../../../UI/Button/Button";
import {AuthService} from "../../../../../services/AuthService";
import {AlertService} from "../../../../../services/AlertService";
import styles from "./registration.module.css"

const RegistrationForm = () => {
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    async function SubmitHandler(login: string, password: string) {
        const registrationResult = await AuthService.registrationAsync({
            login,
            password
        })

        if (registrationResult.tryCatchError()) {
            return;
        }

        return AlertService.successMessage("Вы успешно зарегистрировались. Теперь вы можете авторизоваться!")
    }

    return (
        <div>

            <p className={styles.header_text}>Регистрация через логин и пароль</p>

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

            <Button
                styles={{marginTop: 25}}
                lockFunction={async () => await SubmitHandler(login, password)}
            >
                Отправить
            </Button>
        </div>
    );
};

export default RegistrationForm;