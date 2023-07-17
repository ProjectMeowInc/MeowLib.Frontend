import React, {useState} from 'react';
import styles from "./select.module.css"
import {UserBookStatus} from "../../../../../../services/models/UserBookStatus";
import {BookService} from "../../../../../../services/BookService";
import {useParams} from "react-router-dom";
import {AlertService} from "../../../../../../services/AlertService";

const SelectStatus = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [status, setStatus] = useState<UserBookStatus | null>(null)
    const params = useParams()

    const id = params.bookId

    async function AddStatusHandler(status: UserBookStatus) {

        if (id === undefined) {
            return
        }

        setStatus(status)

        const addStatusResult = await BookService.addStatusToBookAsync(parseInt(id), status)

        if (addStatusResult.tryCatchError()) {
            return
        }

        AlertService.successMessage("Книга была добавлена")
    }

    return (
        <div onClick={() => setIsOpen(!isOpen)} className={styles.select}>
            <div className={styles.add}>{status ?? "Добавить в закладки"}</div>
            <div className={isOpen ? styles.option_active : styles.option}>
                <div onClick={() => AddStatusHandler("InPlans")}>В планах</div>
                <div onClick={() => AddStatusHandler("ReadingNow")}>Читаю</div>
                <div onClick={() => AddStatusHandler("Favorite")}>Избранное</div>
                <div onClick={() => AddStatusHandler("Read")}>Прочитано</div>
            </div>
        </div>
    );
};

export default SelectStatus;