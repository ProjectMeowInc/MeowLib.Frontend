import React, {useState} from 'react';
import styles from "./createTagPage.module.css"
import {ErrorService} from "../../../../services/ErrorService";
import {TagsService} from "../../../../services/TagsService";
import {ICreateTagRequest} from "../../../../services/models/requests/ITagRequests";
import {AlertService} from "../../../../services/AlertService";
import {ErrorTypesEnum} from "../../../../services/models/IError";
import {RedirectService} from "../../../../services/RedirectService";

const CreateTagPage = () => {
    const [tagName, setTagName] = useState<string>()
    const [tagDescription, setTagDescription] = useState<string | undefined>()

    function SubmitHandler() {
        if (tagName === undefined) {
            return ErrorService.warningError("Вы не указали имя")
        }

        const data: ICreateTagRequest = {
            name: tagName,
            description: tagDescription
        }

        TagsService.createTagAsync(data).then(err => {
            if (err === null) {
                AlertService.successMessage("Тэг успешно создан")
                return RedirectService.delayRedirectToPrevPage()
            }

            if (err.errorType === ErrorTypesEnum.Critical) {
                return AlertService.errorMessage(err.displayMessage)
            }

            return AlertService.warningMessage(err.displayMessage)
        })
    }

    return (
        <div>
            <h1 className={styles.caption}>Добавление нового тэга</h1>
            <div className={styles.placeholders}>
                <input onChange={(ctx) => setTagName(ctx.target.value)} className={styles.input} type="text" placeholder={'Введите название тэга'}/>
                <textarea onChange={(ctx) => setTagDescription(ctx.target.value)} className={styles.textarea} name="tag_description" placeholder={"Введите описание тэга"}/>
                <button onClick={SubmitHandler} className={styles.button}>Создать</button>
            </div>
        </div>
    );
};

export default CreateTagPage;