import React from 'react';
import {IUser} from "../../../../../../services/models/entities/UserModels";
import styles from "./bookComment.module.css"

interface IBookCommentProps {
    text: string
    postedAt: Date
    author: IUser
}

const BookComment = ({text, author, postedAt}: IBookCommentProps) => {
    return (
        <div className={styles.comment}>
            <p className={styles.author}>{author.login}</p>
            <div className={styles.text}>
                <p>{text}</p>
                <p>{postedAt.toLocaleString("ru", {dateStyle: "short"})}</p>
            </div>
        </div>
    );
};

export default BookComment;