import React, {useState} from 'react';
import styles from "./createAuthorPage.module.css"
import {AlertService} from "../../../../services/AlertService";
import {TokenService} from "../../../../services/TokenService";
import {AuthorServices} from "../../../../services/AuthorServices";
import {ICreateAuthorRequest} from "../../../../services/models/requests/IAuthorRequests";
import {RedirectService} from "../../../../services/RedirectService";

const CreateAuthorPage = () => {

    const [requestData, setRequestData] = useState<ICreateAuthorRequest>()

    function SubmitHandler() {

        if (requestData === undefined) {
            return AlertService.warningMessage("Не все поля указаны")
        }

        if (requestData.name === undefined) {
            return AlertService.warningMessage("Не указано имя автора")
        }

        const tokenData = TokenService.getAccessTokenAsync()

        if (tokenData === null) {
            return AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
        }

        AuthorServices.createAuthorAsync(requestData).then(createAuthorResult => {
            if(createAuthorResult.tryCatchError()) {
                return
            }
            return  AlertService.successMessage("Автор успешно создан")
        })

        return RedirectService.delayRedirectToPrevPage()
    }

    function UpdateNameHandler(name: string) {
        setRequestData(prevState => {
            return {...prevState, name: name}
        })
    }

    return (
        <div>
            <h1 className={styles.caption}>Добавление нового автора</h1>
            <div className={styles.create}>
                <div className={styles.profile}>
                    <img src="/img/profileIcon.png" alt=""/>
                </div>
                <div className={styles.form}>
                    <input className={styles.input} onChange={(ctx) => UpdateNameHandler(ctx.target.value)} type="text" placeholder={"Введите имя автора"}/>
                    <button className={styles.button} onClick={SubmitHandler}>Создать</button>
                </div>
            </div>
        </div>
    );
};

export default CreateAuthorPage;