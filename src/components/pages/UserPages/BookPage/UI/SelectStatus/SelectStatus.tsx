import React, {useState} from 'react';
import styles from "./select.module.css"
import {UserBookStatus, UserBookStatuses} from "../../../../../../services/models/UserBookStatus";
import {AlertService} from "../../../../../../services/AlertService";
import {UserFavoriteService} from "../../../../../../services/UserFavoriteService";

interface ISelectStatusProps {
    bookId: number
    currentlySelected: UserBookStatus | null
}

const SelectStatus = ({bookId, currentlySelected}: ISelectStatusProps) => {
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

        AlertService.successMessage("Книга была добавлена")
    }

    return (
        <div onClick={() => setIsOpen(!isOpen)} className={styles.select}>
            <div className={styles.add}>{status ? UserFavoriteService.getDisplayStatusName(status) : "Добавить в закладки"}</div>
            <div className={isOpen ? styles.option_active : styles.option}>
                {
                    UserBookStatuses.map((status: UserBookStatus) => (
                        <div onClick={() => AddStatusHandler(status)}>{UserFavoriteService.getDisplayStatusName(status)}</div>
                    ))
                }
            </div>
        </div>
    );
};

export default SelectStatus;