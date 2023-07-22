import React from 'react';
import styles from "./burgerMenuItem.module.css"
import {Link} from "react-router-dom";

interface IBurgerMenuItemProps {
    text: string
    link: string
}

const BurgerMenuItem = ({text, link}: IBurgerMenuItemProps) => {
    return (
        <Link to={link} className={styles.list_item}>
            {text}
        </Link>
    );
};

export default BurgerMenuItem;