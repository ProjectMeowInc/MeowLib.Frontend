import React from 'react';
import styles from "./adminPage.module.css";
import {Link} from "react-router-dom";

const AdminPage = () => {
    return (
        <div className={styles.admin_items}>
            <div className={styles.admin_item}>
                <p>Книги</p>
            </div>

            <Link to={"tags"} className={styles.admin_item}>
                <p>Теги</p>
            </Link>

            <Link to={"authors"} className={styles.admin_item}>
                <p>Авторы</p>
            </Link>

            <div className={styles.admin_item}>
                <p>Пользователи</p>
            </div>

            <div className={styles.admin_item}>
                <p>Модерация</p>
            </div>
        </div>
    );
};

export default AdminPage;