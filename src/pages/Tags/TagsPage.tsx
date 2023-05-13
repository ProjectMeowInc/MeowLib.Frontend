import React, {useContext, useEffect, useState} from 'react';
import styles from "./tagsPage.module.css"
import {AlertService} from "../../services/AlertService";
import {ICreateTagRequest} from "../../services/models/requests/ITagRequests";
import {TokenService} from "../../services/TokenService";
import {ErrorService} from "../../services/ErrorService";
import Preloader from "../../components/preloader/preloader";
import TagsPageListItem from "../../components/TagsPage/TagsPageListItem";
import {ITagsDTO} from "../../services/models/DTO/ITagsDTO";
import {TagsService} from "../../services/TagsService";
import {ErrorTypesEnum} from "../../services/models/IError";
import {RedirectContext} from "../../context/RedirectContext";
import {LoadingContext} from "../../context/LoadingContext";

const TagsPage = () => {
    const [tagList, setTagList] = useState<ITagsDTO[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {delayRedirect} = useContext(RedirectContext)
    const {setLoadingPercent, startNewTask} = useContext(LoadingContext)

    function ClickHandler() {

        const name = prompt("Введите название тэга")
        const description = prompt("Введите описание тэга")

        if(name === null) {
            return AlertService.warningMessage("Не указано имя тэга")
        }

        const data: ICreateTagRequest = {
            name: name,
            description: description ?? "Пока без описания"
        }

        const tokenData = TokenService.getAccessToken()

        startNewTask()
        setLoadingPercent(25)

        if (tokenData === null) {
            return AlertService.errorMessage("Ошибка токена. Пожалуйста авторизуйтесь заново.")
        }

        TagsService.createTag(data).then(error => {
            if(error !== null) {

                if(error.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(error.displayMessage)
                }

                return AlertService.warningMessage(error.displayMessage)
            }

            AlertService.successMessage("Тэг успешно добавлен")
        })
        setLoadingPercent(100)
        delayRedirect(0)
    }

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

            <div onClick={ClickHandler} className={styles.add_button}>
                <p>Нажмите чтобы добавить нового тэга</p>
            </div>

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