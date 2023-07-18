import React, {ReactNode} from 'react';
import styles from "./layoutContentItem.module.css"
import {Outlet} from "react-router-dom";

interface ILayoutContentItemProps {
    component: ReactNode
}

const LayoutContentItem = ({component}: ILayoutContentItemProps) => {
    return (
        <div className={styles.content_item}>
            {component}
        </div>
    );
};

export default LayoutContentItem;