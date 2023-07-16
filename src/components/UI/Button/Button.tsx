import React, {useState} from 'react';
import classes from "./button.module.css"

interface IButtonProps {
    children: string
    styles?: {
        textSize?: string
        textColor?: string,
        marginTop?: number
    }
    onClick?: () => void
    lockFunction?: () => Promise<void>
}

const Button = ({children, styles, onClick, lockFunction}: IButtonProps) => {

    const [isLock, setIsLock] = useState<boolean>(false)

    function ClickHandler(): void {
        if (!lockFunction) {
            return onClick?.call(null);
        }

        if (isLock) {
            return;
        }

        setIsLock(true)

        lockFunction()
            .then(() => {
                setIsLock(false)
            })
    }

    return (
        <div
            className={isLock ? classes.button_locked : classes.button}
            style={{fontSize: styles?.textSize, color: styles?.textColor, marginTop: styles?.marginTop}}
            onClick={ClickHandler}
        >
            {children}
        </div>
    );
};

export default Button;