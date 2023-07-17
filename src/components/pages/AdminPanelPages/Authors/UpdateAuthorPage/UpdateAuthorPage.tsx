import React, {useEffect, useState} from 'react';
import styles from "../CreateAuthorPage/createAuthorPage.module.css";
import {AlertService} from "../../../../../services/AlertService";
import {AuthorServices} from "../../../../../services/AuthorServices";
import {useNavigate, useParams} from "react-router-dom";
import {IAuthor} from "../../../../../services/models/entities/AuthorModels";
import Preloader from "../../../../UI/Preloader/Preloader";
import {RedirectService} from "../../../../../services/RedirectService";

const UpdateAuthorPage = () => {

    const [author, setAuthor] = useState<IAuthor | null>(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        if (params.id === undefined) {
            return navigate("/NotFound")
        }

        AuthorServices.getAuthorAsync(parseInt(params.id)).then(getAuthorResult => {
            if (getAuthorResult.tryCatchError()) {
                return
            }

            setAuthor(getAuthorResult.unwrap())
        })
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

        AuthorServices.updateAuthorAsync(author.id, author.name).then(getAuthorResult => {
            if (getAuthorResult.tryCatchError()) {
                return
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