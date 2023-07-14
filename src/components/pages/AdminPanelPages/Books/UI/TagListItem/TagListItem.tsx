import React, {useContext, useEffect, useState} from 'react';
import {ITagDTO} from "../../../../../../services/models/DTO/ITagDTO";
import styles from "./tagListItem.module.css";
import {TagsContext} from "../../../../../../context/TagsContext";

const TagListItem = ({id, name, description}: ITagDTO) => {

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const {setSelectedTags, checkTagIsSelected} = useContext(TagsContext)

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