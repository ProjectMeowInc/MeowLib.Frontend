import React, {useContext, useEffect, useState} from 'react';
import styles from "./updateTagPage.module.css"
import {TagsService} from "../../../services/TagsService";
import {useNavigate, useParams} from "react-router-dom";
import {AlertService} from "../../../services/AlertService";
import {ErrorTypesEnum} from "../../../services/models/IError";
import {RedirectContext} from "../../../context/RedirectContext";
import {ErrorService} from "../../../services/ErrorService";
import Preloader from "../../../components/preloader/preloader";
import {ITagDTO} from "../../../services/models/DTO/ITagDTO";

const UpdateTagPage = () => {

    const [tagData, setTagData] = useState<ITagDTO | null>(null)
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

    async function SubmitHandler () {


        if (params.id === undefined) {
            return navigate("/404NotFound")
        }

        if (tagData === null) {
            return AlertService.warningMessage("Произошла ошибка")
        }

        const err= await TagsService.updateTag(parseInt(params.id), tagData)
            if (err !== null) {
                if (err.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(err.displayMessage)
                }

                AlertService.warningMessage(err.displayMessage)
            }

            AlertService.successMessage("Успешно обновлена информация о тэге")
            return delayRedirect(-1)
    }

    function UpdateInformationHandler(updateTagData: ITagDTO) {

        if (tagData !== null && tagData.id !== undefined) {
            setTagData({...tagData, name: updateTagData.name, description: updateTagData.description})
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
                    onChange={(ctx) => UpdateInformationHandler({...tagData, name: ctx.target.value})}
                    className={styles.input}
                    type="text"
                    placeholder={tagData.name ?? "Введите название тэга"}/>
                <textarea
                    onChange={(ctx) => UpdateInformationHandler({...tagData, description: ctx.target.value})}
                    className={styles.textarea}
                    name="tag_description"
                    placeholder={tagData.description ?? "Введите описание тега"}/>
                <button onClick={SubmitHandler} className={styles.button}>Сохранить</button>
            </div>
        </div>
    );
};

export default UpdateTagPage;