import React, {useContext, useEffect, useState} from 'react';
import styles from "./updateTagPage.module.css"
import {TagsService} from "../../../services/TagsService";
import {IUpdateTagRequest} from "../../../services/models/requests/ITagRequests";
import {useParams} from "react-router-dom";
import {AlertService} from "../../../services/AlertService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {RedirectContext} from "../../../context/RedirectContext";
import {IGetTagResponse} from "../../../services/models/responses/IGetTagsResponse";
import {ErrorService} from "../../../services/ErrorService";
import Preloader from "../../../components/preloader/preloader";

const UpdateTagPage = () => {

    const [tagName, setTagName] = useState<string | null>(null)
    const [tagDescription, setTagDescription] = useState<string | null>(null)
    const [tagData, setTagData] = useState<IGetTagResponse | null>(null)
    const {delayRedirect} = useContext(RedirectContext)
    const params = useParams()

    useEffect(() => {
        if (params.id === undefined) {
            return AlertService.warningMessage("Вы не указали id тэга")
        }

        TagsService.getTagById(parseInt(params.id)).then(response => {
            if (ErrorService.isError(response)) {
                if (response.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(response.displayMessage)
                }

                return AlertService.warningMessage(response.displayMessage)
            }

            setTagData(response)
        })

    }, [])

    function SubmitHandler () {

        const data: IUpdateTagRequest = {
            name: tagName,
            description: tagDescription
        }

        if (params.id === undefined) {
            return AlertService.warningMessage("Вы не указали id тэга")
        }

        TagsService.updateTag(parseInt(params.id), data).then(err => {
            if (err === null) {
                return AlertService.successMessage("Успешно обновлена информация о тэге")
            }

            if (err.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(err.displayMessage)
            }

            delayRedirect(-1)
            return AlertService.warningMessage(err.displayMessage)
        })
    }

    if (tagData === null) {
        return (
            <Preloader/>
        )
    }

    return (
        <div>
            <h1 className={styles.caption}>Обновление информации о тэге</h1>
            <div className={styles.placeholders}>
                <input onChange={(ctx) => setTagName(ctx.target.value)} className={styles.input} type="text" placeholder={tagData.name}/>
                <textarea onChange={(ctx) => setTagDescription(ctx.target.value)} className={styles.textarea} name="tag_description" placeholder={tagData.description ?? "Введите описание тега"}/>
                <button onClick={SubmitHandler} className={styles.button}>Сохранить</button>
            </div>
        </div>
    );
};

export default UpdateTagPage;