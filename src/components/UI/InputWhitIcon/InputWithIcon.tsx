import React, {useState} from 'react';
import classes from "./inputWithIcon.module.css"

interface IInputInputWithIconProps {
    text?: string
    isSilentInput?: boolean,
    validateFunction?: (value: string) => boolean
    displayError?: boolean
    placeholder?: string
    onChange?: (value: string) => void
    styles?: {
        textColor?: string
        marginTop?: number
    }
}

const InputWithIcon = ({isSilentInput, validateFunction, displayError, placeholder, onChange, styles}: IInputInputWithIconProps) => {

    const [input, setInput] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    function KeyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key !== "Enter" && event.key !== "Tab") {
            return;
        }

        if (!validateFunction) {
            return;
        }

        if (!validateFunction(input)) {
            return setError("Ошибка валидации")
        }

        return setError(null)
    }

    function ChangeHandler(value: string) {
        setInput(value)
        onChange?.call(null, value)

        if (!validateFunction) {
            return;
        }

        if (validateFunction(value)) {
            setError(null)
        }
    }

    return (
        <div>
            <div className={classes.input_wrapper}>
                <div className={classes.img}>
                    <img src="/img/free-icon-home-5381665.png" alt=""/>
                </div>
                <input className={classes.input}
                    onChange={ctx => ChangeHandler(ctx.target.value)}
                    onKeyDown={KeyDownHandler}
                    placeholder={placeholder}
                    type={isSilentInput ? "password": "text"}
                    style={{marginTop: styles?.marginTop, color: styles?.textColor}}
                />
            </div>
            {displayError && error && <p>Ошибка: {error}</p>}
        </div>
    );
};

export default InputWithIcon;