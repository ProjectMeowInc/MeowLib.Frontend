import React, {useEffect, useState} from 'react';
import Input from "../../../../../UI/Input/Input";
import Button from "../../../../../UI/Button/Button";
import {IBookCommentsDto} from "../../../../../../services/models/entities/BookCommentsModels";
import {BookCommentsService} from "../../../../../../services/BookCommentsService";
import BookComment from "../BookComment/BookComment";
import styles from "./bookComments.module.css"
import {AlertService} from "../../../../../../services/AlertService";

interface IBookCommentsProps {
    bookId: number
}

const BookComments = ({bookId}:IBookCommentsProps) => {

    const [comments, setComments] = useState<IBookCommentsDto[]>([])
    const [newComment, setNewComment] = useState<string>("")

    useEffect(() => {
        BookCommentsService.getBookCommentsAsync(bookId).then(getCommentsResult => {
            if (getCommentsResult.tryCatchError()) {
                return
            }

            setComments(getCommentsResult.unwrap())
        })
    }, [])

    async function SendCommentHandler(text: string) {
        const addBookCommentResult = await BookCommentsService.addBookCommentAsync(bookId, text)

        if (addBookCommentResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Комментарий оставлен")
    }

    return (
        <div>
            <div className={styles.add_comment}>
                <Input
                    onChange={ctx => setNewComment(ctx)}
                    placeholder={"Введите текст комментария"}
                />
                <Button lockFunction={ async () => await SendCommentHandler(newComment)}>Отправить</Button>
            </div>

            {
                comments.length > 0
                    ? comments.map(comment => (
                        <BookComment
                            text={comment.text}
                            author={comment.author}
                            postedAt={comment.postedAt}
                        />
                    ))
                    : <p className={styles.none_comments}>Оставьте комментарий первым!</p>
            }
        </div>
    );
};

export default BookComments;