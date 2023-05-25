import React, {useContext, useEffect, useState} from 'react';
import styles from "./updateTagPage.module.css"
import {TagsService} from "../../../services/TagsService";
import {useNavigate, useParams} from "react-router-dom";
import {AlertService} from "../../../services/AlertService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {RedirectContext} from "../../../context/RedirectContext";
import {ErrorService} from "../../../services/ErrorService";
import Preloader from "../../../components/preloader/preloader";
import {ITagsDTO} from "../../../services/models/DTO/ITagsDTO";

const UpdateTagPage = () => {

    const [tagData, setTagData] = useState<ITagsDTO | null>(null)
    const {delayRedirect} = useContext(RedirectContext)
    const params = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (params.id === undefined) {
            return navigate("/404NotFound")
        }

        TagsService.getTagById(parseInt(params.id)).then(response => {
            if (ErrorService.isError(response)) {
                if (response.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(response.displayMessage)
                }

                return AlertService.warningMessage(response.displayMessage)
            }

            setTagData({
                id: response.id,
                name: response.name,
                description: response.description ?? "На описание не хватило бюджета"
            })
        })

    }, [])

    function SubmitHandler () {


        if (params.id === undefined) {
            return navigate("/404NotFound")
        }

        if (tagData === null) {
            return AlertService.warningMessage("Произошла ошибка")
        }

        const data = {
            name: tagData.name,
            description: tagData.description ?? null
        }

        TagsService.updateTag(parseInt(params.id), data).then(err => {
            if (err !== null) {
                if (err.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(err.displayMessage)
                }

                AlertService.warningMessage(err.displayMessage)
            }

            AlertService.successMessage("Успешно обновлена информация о тэге")
            return delayRedirect(-1)
        })
    }

    function UpdateInformationHandler(name: string | null, description: string | null) {

        if (tagData !== null && tagData.id !== undefined) {
            setTagData({...tagData, name: name, description: description})
        }
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
                <input
                    onBlur={(ctx) => UpdateInformationHandler(ctx.target.value, tagData.description)}
                    className={styles.input}
                    type="text"
                    placeholder={tagData.name ?? "Введите название тэга"}/>
                <textarea
                    onBlur={(ctx) => UpdateInformationHandler(tagData.name, ctx.target.value)}
                    className={styles.textarea}
                    name="tag_description"
                    placeholder={tagData.description ?? "Введите описание тега"}/>
                <button onClick={SubmitHandler} className={styles.button}>Сохранить</button>
            </div>
        </div>
    );
};

export default UpdateTagPage;