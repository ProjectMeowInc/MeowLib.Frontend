import { ErrorTypesEnum, IError } from "./models/IError";

/**
 * Класс для удобного создания ошибок
 */
export class ErrorService {

    /**
     * Метод создаёт модель критической ошибки. 
     * 
     * TODO: Может стоит добавить логирование таких ошибок на backend.
     * @param displayMessage Сообщение для отображения в интерфейсе. 
     * Для критических ошибок стандартное значение - "Неизвестная критическая ошибка".
     * @returns Модель ошибки.
     */
    static criticalError(displayMessage: string | null): IError {
        const error: IError = {
            displayMessage: displayMessage ?? "Неизвестная критическая ошибка",
            errorType: ErrorTypesEnum.Critical
        }

        return error;
    }

    /**
     * Метод создаёт модель варнинг-ошибки. 
     * @param displayMessage Сообщение для отображения в интерфейсе. Может быть пустым.
     * @returns Модель ошибки.
     */
    static warningError(displayMessage: string | null): IError {
        const error: IError = {
            displayMessage: displayMessage,
            errorType: ErrorTypesEnum.Warning
        }

        return error;
    }

    /**
     * Метод создаёт модель обычной ошибки. 
     * @param displayMessage Сообщение для отображения в интерфейсе. Может быть пустым.
     * @returns Модель ошибки.
     */
    static commonError(displayMessage: string | null): IError {
        const error: IError = {
            displayMessage: displayMessage,
            errorType: ErrorTypesEnum.Error
        }

        return error;
    }
}