import React from 'react';
import {IAuthor} from "../../../../../../../services/models/entities/AuthorModels";
import AuthorListItem from "../AuthorListItem/AuthorListItem";
import styles from "./aurhorList.module.css"

interface IAuthorListProps {
    authorList: IAuthor[]
}

const AuthorList = ({authorList}: IAuthorListProps) => {
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