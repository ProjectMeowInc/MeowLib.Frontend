import React from 'react';
import styles from "./adminPage.module.css";

const AdminPage = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.admin}>
                <p className={styles.logo}>MeowLib</p>
                <div className={styles.admin_items}>
                    <div className={styles.admin_item}>
                        <p>Книги</p>
                    </div>

                    <div className={styles.admin_item}>
                        <p>Теги</p>
                    </div>

                    <div className={styles.admin_item}>
                        <p>Авторы</p>
                    </div>

                    <div className={styles.admin_item}>
                        <p>Пользователи</p>
                    </div>

                    <div className={styles.admin_item}>
                        <p>Модерация</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;