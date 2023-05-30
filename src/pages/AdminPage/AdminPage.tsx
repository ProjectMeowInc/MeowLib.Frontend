import React from 'react';
import styles from "./adminPage.module.css";
import {Link} from "react-router-dom";

const AdminPage = () => {
    return (
        <div className={styles.admin_items}>
            <Link to={"books"} className={styles.admin_item}>
                <p className={styles.a}>Книги</p>
            </Link>

            <Link to={"tags"} className={styles.admin_item}>
                <p className={styles.a}>Теги</p>
            </Link>

            <Link to={"authors"} className={styles.admin_item}>
                <p className={styles.a}>Авторы</p>
            </Link>

            <div className={styles.admin_item}>
                <p className={styles.a}>Пользователи</p>
            </div>

            <div className={styles.admin_item}>
                <p className={styles.a}>Модерация</p>
            </div>
        </div>
    );
};

export default AdminPage;