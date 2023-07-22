import React from 'react';
import styles from "./settings.module.css"
import Button from "../../../../../UI/Button/Button";
import {BookmarkService} from "../../../../../../services/BookmarkService";
import {useParams} from "react-router-dom";
import {AlertService} from "../../../../../../services/AlertService";
import {useSettings} from "../../../../../../hooks/useSettings";

const Settings = () => {

    const {fontSize, setFontSize, lineHeight, setLineHeight} = useSettings()
    const params = useParams()

    async function AddBookMarkHandler() {
        const chapterId = params.chapterId

        if (!chapterId) {
            return
        }
        const addBookMarkResult = await BookmarkService.addBookmarkAsync(parseInt(chapterId))

        if (addBookMarkResult.tryCatchError()) {
            return
        }

        return AlertService.successMessage("Закладка добавлена")
    }

    return (
        <div className={styles.settings}>
            <h1>Настройки читалки</h1>

            <p>Размер шрифта {fontSize}</p>
            <input className={styles.input} onChange={(ctx) => setFontSize(parseInt(ctx.target.value))} value={fontSize} type="range" min={14} max={32}/>

            <p>Высота строк {lineHeight / 10}</p>
            <input className={styles.input} onChange={(ctx) => setLineHeight(parseInt(ctx.target.value))} value={lineHeight} type="range" min={10} max={25}/>

            <Button children={"Добавить закладку"} lockFunction={async () => await AddBookMarkHandler()}/>
        </div>
    );
};

export default Settings;