import React from 'react';
import {IAuthorDTO} from "../../../services/models/DTO/IAuthorModels";
import AuthorListItem from "../AuthorListItem/AuthorListItem";
import styles from "./aurhorList.module.css"

interface IAuthorList {
    authorList: IAuthorDTO[]
}

const AuthorList = ({authorList}: IAuthorList) => {
    return (
        <div className={styles.authors}>
            {
                authorList.map(author => (
                    <AuthorListItem key={author.id} id={author.id} name={author.name}/>
                ))
            }
        </div>
    );
};

export default AuthorList;