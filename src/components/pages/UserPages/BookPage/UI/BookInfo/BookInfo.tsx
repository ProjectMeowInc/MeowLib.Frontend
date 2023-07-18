import React, {useEffect, useState} from 'react';
import {IBook} from "../../../../../../services/models/entities/BookModels";
import LayoutContentItem from "../../../../../UI/LayoutContentItem/LayoutContentItem";
import styles from "./bookInfo.module.css"
import Button from "../../../../../UI/Button/Button";
import SelectStatusButton from "../SelectStatus/SelectStatusButton";
import {UserFavoriteService} from "../../../../../../services/UserFavoriteService";
import {IUserFavorite} from "../../../../../../services/models/entities/UserFavoriteModels";

interface IBookInfoProps {
    book: IBook
}

const BookInfo = ({book}: IBookInfoProps) => {

    const [userFavorite, setUserFavorite] = useState<IUserFavorite | null>(null)

    useEffect(() => {

        UserFavoriteService.getUserFavoriteByBookId(book.id)
            .then(getUserFavoriteBookResult => {
                if (getUserFavoriteBookResult.tryCatchError()) {
                    return
                }

                setUserFavorite(getUserFavoriteBookResult.unwrap())
            })

    }, [])

    return (
        <LayoutContentItem removePadding>
            <div className={styles.content}>
                <div className="book_image">
                    <div className={styles.image_background}>
                        <img
                            src={book.imageUrl ?? "/img/someBook.png"}
                            alt=""
                            className={styles.b}
                        />
                    </div>
                </div>
                <div className={styles.main_info}>
                    <div className={styles.book_name}>
                        {book.name}
                    </div>
                    <div className={styles.book_description}>
                        {book.description}
                    </div>
                </div>
                <div className={styles.interact_buttons}>
                    {

                    }
                    <Button>
                        Читать
                    </Button>
                    <SelectStatusButton bookId={book.id} currentlySelected={userFavorite?.status ?? null}/>
                </div>
            </div>
        </LayoutContentItem>
    );
};

export default BookInfo;