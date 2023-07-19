import React from 'react';
import {ITagModel} from "../../../../../../services/models/entities/TagModels";
import styles from "./bookDescription.module.css"
import BookTag from "../BookTag/BookTag";

interface IBookDescriptionProps {
    description: string
    tags: ITagModel[]
}

const BookDescription = ({description, tags}:IBookDescriptionProps) => {
    return (
        <div className={styles.description}>
            <h1 className={styles.caption}>Описание</h1>
            <p className={styles.text}>{description}</p>
            <div className={styles.tags}>
                {
                    tags.map(tag => (
                        <BookTag tagName={tag.name}/>
                    ))
                }
            </div>
        </div>
    );
};

export default BookDescription;