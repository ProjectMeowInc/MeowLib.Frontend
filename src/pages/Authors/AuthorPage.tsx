import React, {useEffect, useState} from 'react';
import AuthorListItem from "../../components/AuthorPage/AuthorListItem";
import styles from "./authorsPage.module.css"
import {AuthorServices} from "../../services/AuthorServices";
import {ErrorService} from "../../services/ErrorService";
import {IAuthorDTO} from "../../services/models/DTO/IAuthorModels";
import Preloader from "../../components/preloader/preloader";
import {TokenService} from "../../services/TokenService";
import {IError} from "../../services/models/IError";

const AuthorPage = () => {

    const [authorsList, setAuthorsList] = useState<IAuthorDTO[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const token: string | IError = TokenService.getAccessToken()

    if (ErrorService.isError(token)) {
        return
    }

    useEffect( () => {
        AuthorServices.getAuthors().then(response => {
            setIsLoading(false)
            if(!ErrorService.isError(response)) {
                setAuthorsList([...response.data])
            }
            else {
                alert(ErrorService.criticalError("Неизвестная критическая ошибка"))
            }
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление авторами</h1>

            <div onClick={() => {
                const data = prompt("Слышь введи имя эээ")
                AuthorServices.createAuthor(String(data), token).then(error => {
                    if(error === null) {
                        alert("Я это чисто по братски добавил автора")
                        return
                    }

                    alert(`Ты хуйню сморозил ${error.displayMessage}`)
                })
            }} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового автора</p>
            </div>

            {isLoading
                ? <Preloader/>
                : authorsList.map(author => (
                    <AuthorListItem key={author.id} id={author.id} name={author.name}/>
                ))
            }

        </div>
    );
};

export default AuthorPage;