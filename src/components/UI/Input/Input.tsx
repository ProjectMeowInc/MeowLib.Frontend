import React, {useState} from 'react';
import classes from "./input.module.css"

interface IInputProps {
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

const Input = ({text, isSilentInput, validateFunction, displayError, placeholder, onChange, styles}: IInputProps) => {

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
        <div style={{marginTop: styles?.marginTop}}>
            <div className={classes.text}>
                {text}
            </div>
            <input
                type={isSilentInput ? "password" : "text"}
                onKeyDown={KeyDownHandler}
                onChange={(ctx) => ChangeHandler(ctx.target.value)}
                className={classes.input}
                placeholder={placeholder}
                style={{color: styles?.textColor}}
            />
            {
                displayError && error && (
                    <div>
                        Ошибка: {error}
                    </div>
                )
            }
        </div>
    );
};

export default Input;