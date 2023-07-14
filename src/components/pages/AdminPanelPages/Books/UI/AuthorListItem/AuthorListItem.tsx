import React, {useContext} from 'react';
import {IAuthorDTO} from "../../../../../../services/models/DTO/IAuthorModels";
import styles from "./authorListItem.module.css";
import {AuthorContext} from "../../../../../../context/AuthorContext";

const AuthorListItem = ({id, name}: IAuthorDTO) => {

    const {selectedAuthor, setSelectedAuthor} = useContext(AuthorContext)

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