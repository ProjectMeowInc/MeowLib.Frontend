import React from 'react';
import styles from "./menuItem.module.css"
import {NavLink} from "react-router-dom";

interface IMenuItemProps {
    text: string
    img?: string
    path: string
}

const MenuItem = ({text, path}: IMenuItemProps) => {

    return (
        <NavLink to={path} className={({isActive}): string => {
            return isActive ? styles.active : styles.none_active
        }} > {text}</NavLink>
    );
};

export default MenuItem;