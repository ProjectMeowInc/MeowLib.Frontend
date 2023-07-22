import React from 'react';
import styles from "./tagItem.module.css"

interface ITagItemProps {
    tagName: string
}

const TagItem = ({tagName}:ITagItemProps) => {
    return (
        <div className={styles.tag}>
            {tagName}
        </div>
    );
};

export default TagItem;