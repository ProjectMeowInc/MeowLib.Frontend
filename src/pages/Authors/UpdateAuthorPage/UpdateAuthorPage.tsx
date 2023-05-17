import React, {useContext, useEffect, useState} from 'react';
import styles from "../CreateAuthorPage/createAuthorPage.module.css";
import {AlertService} from "../../../services/AlertService";
import {AuthorServices} from "../../../services/AuthorServices";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {useParams} from "react-router-dom";
import {RedirectContext} from "../../../context/RedirectContext";
import {ErrorService} from "../../../services/ErrorService";
import {IAuthorDTO} from "../../../services/models/DTO/IAuthorModels";
import Preloader from "../../../components/preloader/preloader";

const UpdateAuthorPage = () => {

    const [newNameAuthor, setNewNameAuthor] = useState<string | null>(null)
    const [author, setAuthor] = useState<IAuthorDTO | null>(null)
    const {delayRedirect} = useContext(RedirectContext)
    const id = Number(useParams().id)

    useEffect(() => {
        AuthorServices.getAuthor(id).then(response => {
            if (ErrorService.isError(response)) {

                if (response.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(response.displayMessage)
                }

                return AlertService.warningMessage(response.displayMessage)
            }

            setAuthor(response)
        })
    }, [])

    function ClickHandler() {

        if (newNameAuthor === null) {
            return AlertService.warningMessage("Вы не указали имя автора")
        }

        if (id === undefined) {
            return AlertService.warningMessage("Вы не указали id автора")
        }

        AuthorServices.updateAuthor(id, newNameAuthor).then(err => {
            if (err !== null) {
                if (err.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(err.displayMessage)
                }
                return AlertService.warningMessage(err.displayMessage)
            }

            AlertService.successMessage("Автор был успешно обновлён")

        })

        delayRedirect(-1)
    }

    return (
        <div>
            {author
                ? <div>
                    <h1 className={styles.caption}>Текущее имя: {author?.name}</h1>
                    <div className={styles.create}>
                        <div className={styles.profile}>
                            <img src="/img/profileIcon.png" alt=""/>
                        </div>
                        <div className={styles.form}>
                            <input className={styles.input} onChange={(ctx) => setNewNameAuthor(ctx.target.value)} type="text" placeholder={"Введите новое имя автора"}/>
                            <button className={styles.button} onClick={ClickHandler}>Отправить</button>
                        </div>
                    </div>
                </div>
                : <Preloader/>
            }
        </div>
    );
};

export default UpdateAuthorPage;