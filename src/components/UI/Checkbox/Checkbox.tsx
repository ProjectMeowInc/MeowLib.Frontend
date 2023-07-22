import React, {useState} from 'react';
import styles from "./checkbox.module.css"

interface ICheckboxProps {
    onClick?: (state: boolean) => void
    text?: string
}

const Checkbox = ({text, onClick}: ICheckboxProps) => {
    const [isChecked, setIsChecked] = useState<boolean>(false)

    function ClickHandler(newState: boolean) {
        setIsChecked(newState)

        onClick?.call(null, newState)
    }

    return (
        <div className={styles.checkbox_wrapper}>
            <div
                className={isChecked ? styles.checkbox_checked : styles.checkbox}
                onClick={() => ClickHandler(!isChecked)}
            >
                <div className={styles.circle}>

                </div>
            </div>
            {
                text && (
                    <div className={styles.text}>
                        {text}
                    </div>
                )
            }
        </div>
    );
};

export default Checkbox;