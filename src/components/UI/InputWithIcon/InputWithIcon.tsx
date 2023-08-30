import React from 'react';
import styles from "./inputWithIcon.module.css"

interface InputWithIconProps {
    image: string
    inputType: "text" | "password" | "email"
    placeholder?: string
    label?: string
    onChange?: () => void
}

const InputWithIcon: React.FC<InputWithIconProps> = (
    {
        image,
        inputType,
        onChange,
        placeholder,
        label
    }) => {
    return (
        <div className={styles.input_with_icon}>
            <p className={styles.input_label}>{label}</p>
            <div className={styles.content}>
                <img
                    className={styles.img}
                    src={"/img/" + image}
                    alt=""
                />

                <input
                    placeholder={placeholder}
                    className={styles.input}
                    onChange={onChange}
                    type={inputType}
                />
            </div>
        </div>
    );
};

export default InputWithIcon;