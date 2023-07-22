import React, {useState} from 'react';
import styles from "./switchComponen.module.css"
import BookChapters from "../BookChapters/BookChapters";
import BookComments from "../BookComments/BookComments";

interface ISwitchComponentProps {
    bookId: number
}

const BookSwitchComponent = ({bookId}: ISwitchComponentProps) => {

    const [isChapters, setIsChapters] = useState<boolean>(true)

    return (
        <>
            <div className={styles.switch}>
                <p className={isChapters ? styles.switch_active : styles.switch_none_active}
                   onClick={() => setIsChapters(true)}
                >Главы</p>
                <p className={!isChapters ? styles.switch_active : styles.switch_none_active}
                   onClick={() => setIsChapters(false)}>Комментарии</p>
            </div>

            {isChapters
            ? <BookChapters bookId={bookId}/>
            : <BookComments bookId={bookId}/>
            }
        </>
    );
};

export default BookSwitchComponent;