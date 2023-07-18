import React from 'react';
import {IAuthor} from "../../../../../../../services/models/entities/AuthorModels";
import styles from "./authorListItem.module.css";
import {useAuthor} from "../../../../../../../hooks/useAuthor";

const AuthorListItem = ({id, name}: IAuthor) => {

    const {selectedAuthor, setSelectedAuthor} = useAuthor()

    function SelectHandler() {
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