import React, {useEffect, useState} from 'react';
import styles from "./updateTagPage.module.css"
import {TagsService} from "../../../../../services/TagsService";
import {useParams} from "react-router-dom";
import {AlertService} from "../../../../../services/AlertService";
import Preloader from "../../../../UI/Preloader/Preloader";
import {ITagDto} from "../../../../../services/models/entities/TagModels";
import {RedirectService} from "../../../../../services/RedirectService";

const UpdateTagPage = () => {

    const [tagData, setTagData] = useState<ITagDto | null>(null)
    const params = useParams()

    useEffect(() => {
        if (params.id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        TagsService.getTagByIdAsync(parseInt(params.id)).then(getTagResult => {
            if (getTagResult.tryCatchError()) {
                return
            }

            setTagData(getTagResult.unwrap())
        })

    }, [])

    async function SubmitHandler () {


        if (params.id === undefined) {
            return RedirectService.redirectToNotFoundPage()
        }

        if (tagData === null) {
            return AlertService.warningMessage("Произошла ошибка")
        }

        const updateTagResult = await TagsService.updateTagAsync(parseInt(params.id), tagData)

        if (updateTagResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Успешно обновлена информация о тэге")
        return RedirectService.delayRedirectToPrevPage()
    }

    function UpdateInformationHandler(updateTagData: ITagDto) {

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