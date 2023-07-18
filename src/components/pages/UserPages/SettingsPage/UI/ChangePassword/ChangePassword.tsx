import React from 'react';
import Input from "../../../../../UI/Input/Input";
import styles from "./changePassword.module.css"
import Button from "../../../../../UI/Button/Button";

const ChangePassword = () => {
    return (
        <div className={styles.change_password}>

            <h1>Сменить пароль</h1>

            <Input
                placeholder={"Введите старый пароль"}
                isSilentInput={true}/>

            <Input
                placeholder={"Введите новый пароль"}
                isSilentInput={true}/>
            <Input
                placeholder={"Повторите старый пароль"}
                isSilentInput={true}/>
            <Button children={"Сменить"}/>
        </div>
    );
};

export default ChangePassword;