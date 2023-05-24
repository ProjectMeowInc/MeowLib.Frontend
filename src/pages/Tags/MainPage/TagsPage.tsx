import React, {useContext, useEffect, useState} from 'react';
import styles from "./tagsPage.module.css"
import {AlertService} from "../../../services/AlertService";
import {ICreateTagRequest} from "../../../services/models/requests/ITagRequests";
import {TokenService} from "../../../services/TokenService";
import {ErrorService} from "../../../services/ErrorService";
import Preloader from "../../../components/preloader/preloader";
import TagsPageListItem from "../../../components/TagsPage/TagsPageListItem";
import {ITagsDTO} from "../../../services/models/DTO/ITagsDTO";
import {TagsService} from "../../../services/TagsService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {RedirectContext} from "../../../context/RedirectContext";
import {LoadingContext} from "../../../context/LoadingContext";
import {Link} from "react-router-dom";

const TagsPage = () => {
    const [tagList, setTagList] = useState<ITagsDTO[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {delayRedirect} = useContext(RedirectContext)
    const {setLoadingPercent, startNewTask} = useContext(LoadingContext)

    useEffect( () => {
        TagsService.getAllTags().then(response => {
            setIsLoading(false)

            if (ErrorService.isError(response)) {
                return  AlertService.errorMessage(response.displayMessage)
            }

            setTagList([...response.data])
        })
    }, [])

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Управление тэгами</h1>

            <Link to={"new"} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового тэга</p>
            </Link>

            {isLoading
                ? <Preloader/>
                : tagList.length === 0
                    ? <p className={styles.empty}>Здесь пока ничего нет</p>
                    : tagList.map(tag => (
                        <TagsPageListItem key={tag.id} id={tag.id} name={tag.name}/>
                    ))
            }
        </div>
    );
};

export default TagsPage;