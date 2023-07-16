import React, {useState} from 'react';
import classes from "./input.module.css"

interface IInputProps {
    text: string
    isSilentInput?: boolean,
    validateFunction?: (value: string) => boolean
}

const Input = ({text, isSilentInput, validateFunction}: IInputProps) => {

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

        if (!validateFunction) {
            return;
        }

        if (validateFunction(value)) {
            setError(null)
        }
    }

    return (
        <div>
            <div>
                {text}
            </div>
            <input
                type={isSilentInput ? "password" : "text"}
                onKeyDown={KeyDownHandler}
                onChange={(ctx) => ChangeHandler(ctx.target.value)}
            />
            {
                error && (
                    <div>
                        Ошибка: {error}
                    </div>
                )
            }
        </div>
    );
};

export default Input;