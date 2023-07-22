import React, {useState} from 'react';
import styles from "./selectStatusButton.module.css"
import {UserBookStatus, UserBookStatuses} from "../../../../../../services/models/UserBookStatus";
import {AlertService} from "../../../../../../services/AlertService";
import {UserFavoriteService} from "../../../../../../services/UserFavoriteService";

interface ISelectStatusButtonProps {
    bookId: number
    currentlySelected: UserBookStatus | null
    onStatusChanged?: (updatedStatus: UserBookStatus) => void
}

const SelectStatusButton = ({bookId, currentlySelected, onStatusChanged}: ISelectStatusButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [_, setStatus] = useState<UserBookStatus | null>(currentlySelected)

    async function ClickStatusHandler(status: UserBookStatus) {
        const addStatusResult = await UserFavoriteService.addToUserFavorite({
            bookId,
            status
        })

        if (addStatusResult.tryCatchError()) {
            return
        }

        setStatus(status)

        onStatusChanged?.call(null, status)

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
                            onClick={() => ClickStatusHandler(status)}
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