import React, {useContext, useState} from 'react';
import styles from "./createAuthorPage.module.css"
import {AlertService} from "../../../services/AlertService";
import {TokenService} from "../../../services/TokenService";
import {AuthorServices} from "../../../services/AuthorServices";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {RedirectContext} from "../../../context/RedirectContext";
import {LoadingContext} from "../../../context/LoadingContext";

interface IAuthorName {
    name: string
}

const CreateAuthorPage = () => {

    const [authorName, setAuthorName] = useState<IAuthorName | null>(null)

    const {delayRedirect} = useContext(RedirectContext)
    const {setLoadingPercent, startNewTask} = useContext(LoadingContext)

    function ClickHandler() {

        if(authorName === null) {
            return AlertService.warningMessage("Не указано имя автора")
        }

        if (authorName.name === undefined) {
            return AlertService.warningMessage("Не указано имя автора")
        }

        const tokenData = TokenService.getAccessToken()

        startNewTask()
        setLoadingPercent(25)

        if (tokenData === null) {
            return AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
        }

        AuthorServices.createAuthor(authorName).then(error => {
            if(error !== null) {
                if(error.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(error.displayMessage)
                }

                return AlertService.warningMessage(error.displayMessage)
            }
            return  AlertService.successMessage("Автор успешно создан")
        })

        setLoadingPercent(100)

        delayRedirect(-1)
    }

    function UpdateHandler(name: string) {
        setAuthorName(prevState => {
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
                    <input className={styles.input} onChange={(ctx) => UpdateHandler(ctx.target.value)} type="text" placeholder={"Введите имя автора"}/>
                    <button className={styles.button} onClick={ClickHandler}>Создать</button>
                </div>
            </div>
        </div>
    );
};

export default CreateAuthorPage;