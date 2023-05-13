import React, {useContext, useEffect, useState} from 'react';
import AuthorListItem from "../../components/AuthorPage/AuthorListItem";
import styles from "./authorsPage.module.css"
import {AuthorServices} from "../../services/AuthorServices";
import {ErrorService} from "../../services/ErrorService";
import {IAuthorDTO} from "../../services/models/DTO/IAuthorModels";
import Preloader from "../../components/preloader/preloader";
import {TokenService} from "../../services/TokenService";
import {AlertService} from "../../services/AlertService";
import {ICreateAuthorRequest} from "../../services/models/requests/IAuthorRequests";
import {ErrorTypesEnum} from "../../services/models/IError";
import {RedirectContext} from "../../context/RedirectContext";
import {LoadingContext} from "../../context/LoadingContext";

const AuthorPage = () => {

    const [authorsList, setAuthorsList] = useState<IAuthorDTO[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {delayRedirect} = useContext(RedirectContext)

    const {setLoadingPercent, startNewTask} = useContext(LoadingContext)

    function ClickHandler() {

        const name = prompt("Введите имя автора")

        if(name === null) {
            return AlertService.warningMessage("Не указано имя автора")
        }

        const data: ICreateAuthorRequest = {
            name: name
        }

        const tokenData = TokenService.getAccessToken()

        startNewTask()
        setLoadingPercent(25)

        if (tokenData === null) {
            return AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
        }

        AuthorServices.createAuthor(data).then(error => {
            if(error !== null) {
                if(error.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(error.displayMessage)
                }

                return AlertService.warningMessage(error.displayMessage)
            }
            return  AlertService.successMessage("Автор успешно создан")
        })

        setLoadingPercent(100)

        delayRedirect(0)
    }

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

            <div onClick={ClickHandler} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового автора</p>
            </div>

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