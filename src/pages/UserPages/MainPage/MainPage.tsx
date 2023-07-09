import React from 'react';
import styles from "./mainPage.module.css";

const MainPage = () => {

    return (
        <div className={styles.main}>
            <div className={styles.main_left}>
                <p>Дарим замуррчательное настроение</p>
            </div>
            <div className={styles.main_right}>

                <p>Последние обновления</p>
            </div>
        </div>
    );
};

export default MainPage;