import React from 'react';
import styles from "./notFoundPage.module.css"

const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.error}>Ошибка <span>404</span>. Не найдено</h1>
        </div>
    );
};

export default NotFoundPage;