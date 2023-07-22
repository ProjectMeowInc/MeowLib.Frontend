import React from 'react';
import styles from "./reader.module.css";
import {useSettings} from "../../../../../../hooks/useSettings";

interface IReaderProps {
    caption: string
    text: string
}

const Reader = ({caption, text}: IReaderProps) => {

    const {settings} = useSettings()

    return (
        <div className={styles.page}>
            <h1 className={styles.caption}>{caption}</h1>
            <p style={{fontSize: `${settings.reader.fontSize}px`, lineHeight: settings.reader.lineHeight / 10}} className={styles.text}>{text}</p>
        </div>
    );
};

export default Reader;