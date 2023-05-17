import React, {useEffect, useState} from 'react';
import AuthorListItem from "../../../components/AuthorPage/AuthorListItem";
import styles from "./authorsPage.module.css"
import {AuthorServices} from "../../../services/AuthorServices";
import {ErrorService} from "../../../services/ErrorService";
import {IAuthorDTO} from "../../../services/models/DTO/IAuthorModels";
import Preloader from "../../../components/preloader/preloader";
import {AlertService} from "../../../services/AlertService";
import {Link} from "react-router-dom";

const AuthorPage = () => {

    const [authorsList, setAuthorsList] = useState<IAuthorDTO[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect( () => {
        AuthorServices.getAuthors().then(response => {
            setIsLoading(false)

            if (ErrorService.isError(response)) {
                return AlertService.errorMessage(response.displayMessage)
            }

            setAuthorsList([...response.data])
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление авторами</h1>

            <Link to={"new"} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового автора</p>
            </Link>

            {isLoading
                ? <Preloader/>
                : authorsList.length === 0
                    ? <p className={styles.empty}>Здесь пока ничего нет</p>
                    : authorsList.map(author => (
                        <AuthorListItem key={author.id} id={author.id} name={author.name}/>
                    ))
            }

        </div>
    );
};

export default AuthorPage;