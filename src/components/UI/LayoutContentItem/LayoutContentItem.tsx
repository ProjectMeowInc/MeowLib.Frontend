import React, {ReactNode} from 'react';
import styles from "./layoutContentItem.module.css"

interface ILayoutContentItemProps {
    children: ReactNode
    removePadding?: boolean
}

const LayoutContentItem = ({children, removePadding}: ILayoutContentItemProps) => {
    return (
        <div className={styles.content_item} style={{padding: removePadding ? 0 : 20}}>
            {children}
        </div>
    );
};

export default LayoutContentItem;