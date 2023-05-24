import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from "./tagsPageListItem.module.css";
import {ITagsDTO} from "../../services/models/DTO/ITagsDTO";
import {TagsService} from "../../services/TagsService";
import {ErrorService} from "../../services/ErrorService";
import {AlertService} from "../../services/AlertService";
import {IUpdateTagRequest} from "../../services/models/requests/ITagRequests";
import {ErrorTypesEnum} from "../../services/models/IError";

const TagsPageListItem = ({id, name}: ITagsDTO) => {

    const [tooltip, setTooltip] = useState<string>()

    const navigate = useNavigate()

    function MouseHandler() {
        TagsService.getTagById(id).then(response => {
            if(ErrorService.isError(response)) {
                if(response.errorType === ErrorTypesEnum.Error) {
                    return AlertService.errorMessage(response.displayMessage)
                }
                return AlertService.warningMessage(response.displayMessage)
            }

            setTooltip(response.description ?? "Описания пока нет")
        })
    }


    function DeleteHandler () {
        TagsService.deleteTag(id).then(error => {
            if(error !== null) {
                if(error.errorType === ErrorTypesEnum.Critical) {
                    return AlertService.errorMessage(error.displayMessage)
                }

                return AlertService.warningMessage(error.displayMessage)
            }

            AlertService.successMessage("Тэг удалён")

            navigate(0)
        })
    }

    return (
        <div onMouseOver={MouseHandler} className={styles.item} data-tooltip-id={"my-tooltip"} data-tooltip-content={tooltip}>
            <div className={styles.left_side}>
                <p className={styles.id}>{id}</p>
                <p>{name}</p>
            </div>

            <div className={styles.right_side}>
                <Link to={`${id}/edit`}>Изменить</Link>
                <p onClick={DeleteHandler}>Удалить</p>
            </div>
        </div>
    );
};

export default TagsPageListItem;