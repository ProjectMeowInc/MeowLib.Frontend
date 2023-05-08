import React from 'react';
import styles from "./authorListItem.module.css"

interface IAuthorListItem {
    id: number,
    name: string
}

const AuthorListItem = ({id, name}: IAuthorListItem) => {
    return (
        <div className={styles.item}>
            <p className={styles.id}>{id}</p>
            <p>{name}</p>
        </div>
    );
};

export default AuthorListItem;