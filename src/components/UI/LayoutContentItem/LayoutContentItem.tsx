import React, {ReactNode} from 'react';
import styles from "./layoutContentItem.module.css"

interface ILayoutContentItemProps {
    children: ReactNode
}

const LayoutContentItem = ({children}: ILayoutContentItemProps) => {
    return (
        <div className={styles.content_item}>
            {children}
        </div>
    );
};

export default LayoutContentItem;