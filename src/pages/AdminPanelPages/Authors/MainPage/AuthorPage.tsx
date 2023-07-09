import React, {useEffect, useState} from 'react';
import AuthorListItem from "../../../../components/AuthorPage/AuthorListItem";
import styles from "./authorsPage.module.css"
import {AuthorServices} from "../../../../services/AuthorServices";
import {ErrorService} from "../../../../services/ErrorService";
import {IAuthorDTO} from "../../../../services/models/DTO/IAuthorModels";
import Preloader from "../../../../components/preloader/preloader";
import {AlertService} from "../../../../services/AlertService";
import {Link} from "react-router-dom";
import {ISearchAuthorRequest} from "../../../../services/models/requests/IAuthorRequests";
import {ErrorTypesEnum} from "../../../../services/models/IError";
import {GetAuthorsAsync} from "../../../../helpers/Authors/GetAuthorsAsync";

const AuthorPage = () => {

    const [authorsList, setAuthorsList] = useState<IAuthorDTO[] | null>(null)

    useEffect( () => {
        GetAuthorsAsync().then(result => setAuthorsList(result))
    }, [])

    async function SearchHandler(data: ISearchAuthorRequest) {

        const searchResult = await AuthorServices.searchAuthorWithParamsAsync(data)

        if (ErrorService.isError(searchResult)) {
            if (searchResult.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(searchResult.displayMessage)
            }
            return
        }

        return setAuthorsList(searchResult)
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление авторами</h1>

            <Link to={"new"} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового автора</p>
            </Link>

            <input onChange={async ctx => {
                await SearchHandler({name: ctx.target.value})
            }} className={styles.search} type="text" placeholder={"Введите имя автора"}/>

            {authorsList === null
                ? <Preloader/>
                : authorsList.length !== 0
                    ? authorsList.map(author => (
                        <AuthorListItem key={author.id} id={author.id} name={author.name}/>
                    ))
                    : <p className={styles.empty}>Здесь пока ничего нет</p>
            }

        </div>
    );
};

export default AuthorPage;