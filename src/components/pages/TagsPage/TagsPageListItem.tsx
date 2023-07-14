import React, {useState} from 'react';
import {Link} from "react-router-dom";
import styles from "./tagsPageListItem.module.css";
import {ITagDTO} from "../../../services/models/DTO/ITagDTO";
import {TagsService} from "../../../services/TagsService";
import {AlertService} from "../../../services/AlertService";
import {RedirectService} from "../../../services/RedirectService";

const TagsPageListItem = ({id, name}: ITagDTO) => {

    const [tooltip, setTooltip] = useState<string>()

    function MouseHandler() {
        TagsService.getTagByIdAsync(id).then(getTagResult => {
            if(getTagResult.tryCatchError()) {
                return
            }

            setTooltip(getTagResult.unwrap().description ?? "Описания пока нет")
        })
    }


    function DeleteHandler () {
        TagsService.deleteTagAsync(id).then(deleteTagResult => {
            if(deleteTagResult.hasError()) {
                return
            }

            AlertService.successMessage("Тэг удалён")
            RedirectService.delayReloadPage()
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