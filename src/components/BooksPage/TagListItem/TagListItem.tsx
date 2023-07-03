import React, {useContext, useEffect, useState} from 'react';
import {ITagDTO} from "../../../services/models/DTO/ITagDTO";
import styles from "./tagListItem.module.css";
import {TagsContext} from "../../../context/TagsContext";

const TagListItem = ({id, name, description}: ITagDTO) => {

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const {updateTags, setUpdateTags} = useContext(TagsContext)

    useEffect(() => {
        const checkedTag = updateTags.find(element => {
            return element === id
        })

        if (checkedTag !== undefined) {
            setIsChecked(true)
        }
    })

    function addTagHandler() {
        if (updateTags !== null) {
            const findTag = updateTags.find(element => {
                return element === id
            })

            if (findTag !== undefined) {
                setUpdateTags(updateTags.filter(element => element !== id))
                return
            }

            setUpdateTags([...updateTags, id])
        }
        else {
            setUpdateTags([id])
        }
    }

    return (
        <label className={!isChecked ? styles.label : styles.checked}>
            <input onChange={addTagHandler} className={styles.input} onClick={() => setIsChecked(!isChecked)} type="checkbox" id={id.toString()}/>
            {name}
        </label>
    );
};

export default TagListItem;