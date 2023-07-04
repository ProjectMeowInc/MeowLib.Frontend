import React, {useContext, useEffect, useState} from 'react';
import {IAuthorDTO} from "../../../services/models/DTO/IAuthorModels";
import styles from "./authorListItem.module.css";
import {AuthorContext} from "../../../context/AuthorContext";

const AuthorListItem = ({id, name}: IAuthorDTO) => {

    const [isSelected, setIsSelected] = useState<boolean>(false)
    const {selectedAuthor, setSelectedAuthor} = useContext(AuthorContext)

    useEffect(() => {
        if (selectedAuthor === id) {
            setIsSelected(true)
        }
    }, [])

    function SelectHandler() {

        setIsSelected(prevState => !prevState)

        if (selectedAuthor === id) {
            return setSelectedAuthor(null)
        }

        return setSelectedAuthor(id)
    }

    return (
        <div onClick={SelectHandler} className={selectedAuthor === id ? styles.author: styles.author_none_checked}>
            {name}
        </div>
    );
};

export default AuthorListItem;