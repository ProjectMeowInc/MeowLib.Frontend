import React, {useEffect, useState} from 'react';
import {ITagDto} from "../../../../../../../services/models/entities/TagModels";
import styles from "./tagListItem.module.css";
import {useTags} from "../../../../../../../hooks/useTags";

const TagListItem = ({id, name}: ITagDto) => {

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const {setSelectedTags, checkTagIsSelected} = useTags()

    useEffect(() => {
        setIsChecked(checkTagIsSelected(id))
    })

    function addTagHandler() {
        if (isChecked) {
            return setSelectedTags(prevState => prevState.filter(tagId => tagId !== id))
        }

        return setSelectedTags(prevState => [...prevState, id])
    }

    return (
        <label className={isChecked ? styles.checked : styles.label}>
            <input onClick={() => {
                addTagHandler()
                setIsChecked(!isChecked)
            }} className={styles.input} type="checkbox"/>
            {name}
        </label>
    );
};

export default TagListItem;