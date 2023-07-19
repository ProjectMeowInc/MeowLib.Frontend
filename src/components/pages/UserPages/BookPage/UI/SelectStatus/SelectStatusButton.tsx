import React, {useState} from 'react';
import styles from "./selectStatusButton.module.css"
import {UserBookStatus, UserBookStatuses} from "../../../../../../services/models/UserBookStatus";
import {AlertService} from "../../../../../../services/AlertService";
import {UserFavoriteService} from "../../../../../../services/UserFavoriteService";
import {RedirectService} from "../../../../../../services/RedirectService";

interface ISelectStatusProps {
    bookId: number
    currentlySelected: UserBookStatus | null
}

const SelectStatusButton = ({bookId, currentlySelected}: ISelectStatusProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [status, setStatus] = useState<UserBookStatus | null>(currentlySelected)

    async function AddStatusHandler(status: UserBookStatus) {
        const addStatusResult = await UserFavoriteService.addToUserFavorite({
            bookId,
            status
        })

        if (addStatusResult.tryCatchError()) {
            return
        }

        setStatus(status)

        RedirectService.delayReloadPage()
        AlertService.successMessage("Книга была добавлена")
    }

    return (
        <div className={styles.wrapper}>
            <img className={styles.btn}
                onClick={() => setIsOpen(prev => !prev)}
                src="/img/bookmark.png" alt=""
            />
            <div
                className={isOpen ? styles.select_item_list_active : styles.select_item_list}
            >
                {
                    UserBookStatuses.map((status: UserBookStatus) => (
                        <div className={currentlySelected === status ? styles.current : styles.none_current}
                            onClick={() => AddStatusHandler(status)}
                        >
                            {UserFavoriteService.getDisplayStatusName(status)}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SelectStatusButton;