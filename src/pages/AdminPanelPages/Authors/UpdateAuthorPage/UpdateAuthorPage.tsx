import React, {useEffect, useState} from 'react';
import styles from "../CreateAuthorPage/createAuthorPage.module.css";
import {AlertService} from "../../../../services/AlertService";
import {AuthorServices} from "../../../../services/AuthorServices";
import {ErrorTypesEnum} from "../../../../services/models/IError";
import {useNavigate, useParams} from "react-router-dom";
import {IAuthorDTO} from "../../../../services/models/DTO/IAuthorModels";
import Preloader from "../../../../components/preloader/preloader";
import {RedirectService} from "../../../../services/RedirectService";
import {GetAuthorAsync} from "../../../../helpers/Authors/GetAuthorAsync";

const UpdateAuthorPage = () => {

    const [author, setAuthor] = useState<IAuthorDTO | null>(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        if (params.id === undefined) {
            return navigate("/NotFound")
        }

        GetAuthorAsync(parseInt(params.id)).then(result => setAuthor(result))
    }, [])

    function UpdateName(name: string) {

        if(author === null) {
            return
        }

        setAuthor(prevState => {
            if (prevState === null) {
                return prevState
            }
            return {...prevState, name: name}
        })
    }

    function ClickHandler() {

        if (author === null) {
            return AlertService.errorMessage("Неожиданное поведение")
        }

        AuthorServices.updateAuthorAsync(author.id, author.name).then(err => {
            if (err !== null) {
                if (err.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(err.displayMessage)
                }
                return AlertService.warningMessage(err.displayMessage)
            }

            AlertService.successMessage("Автор был успешно обновлён")

        })

        return RedirectService.delayRedirectToPrevPage()
    }

    return (
        <div>
            {author
                ? <div>
                    <div className={styles.create}>
                        <div className={styles.profile}>
                            <img src="/img/profileIcon.png" alt=""/>
                        </div>
                        <div className={styles.form}>
                            <input className={styles.input} onChange={(ctx) => UpdateName(ctx.target.value)} type="text" placeholder={"Введите новое имя автора"}/>
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