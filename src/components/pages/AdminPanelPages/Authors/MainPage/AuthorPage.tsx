import React, {useEffect, useState} from 'react';
import AuthorListItem from "./UI/AuthorListItem/AuthorListItem";
import styles from "./authorsPage.module.css"
import {AuthorServices} from "../../../../../services/AuthorServices";
import {IAuthor} from "../../../../../services/models/entities/AuthorModels";
import Preloader from "../../../../UI/Preloader/Preloader";
import {Link} from "react-router-dom";
import {ISearchAuthorRequest} from "../../../../../services/models/requests/AuthorRequests";

const AuthorPage = () => {

    const [authorsList, setAuthorsList] = useState<IAuthor[] | null>(null)

    useEffect( () => {
        AuthorServices.getAuthorsAsync().then(getAuthorsResult => {
            if (getAuthorsResult.tryCatchError()) {
                return
            }

            setAuthorsList(getAuthorsResult.unwrap())
        })
    }, [])

    async function SearchHandler(data: ISearchAuthorRequest) {

        const searchResult = await AuthorServices.searchAuthorWithParamsAsync(data)

        if (searchResult.tryCatchError()) {
            return
        }

        return setAuthorsList(searchResult.unwrap())
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