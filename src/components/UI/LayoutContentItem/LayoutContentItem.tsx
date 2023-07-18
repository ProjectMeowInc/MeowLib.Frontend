import React, {ReactNode} from 'react';
import styles from "./layoutContentItem.module.css"

interface ILayoutContentItemProps {
    children: ReactNode
    style?: {
        width: number
    }
}

const LayoutContentItem = ({children, style}: ILayoutContentItemProps) => {
    return (
        <div className={styles.content_item} style={{width: `${style?.width}%`}}>
            {children}
        </div>
    );
};

export default LayoutContentItem;