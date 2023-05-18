import {ErrorTypesEnum, IError} from "./models/IError";
import {AxiosError} from "axios";
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse";

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
    static criticalError(displayMessage: string | null = null): IError {
        return {
            displayMessage: displayMessage ?? "Неизвестная ошибка. Попробуйте ещё раз.",
            errorType: ErrorTypesEnum.Critical
        };
    }

    /**
     * Метод создаёт модель варнинг-ошибки. 
     * @param displayMessage Сообщение для отображения в интерфейсе. Может быть пустым.
     * @returns Модель ошибки.
     */
    static warningError(displayMessage: string | null): IError {
        return {
            displayMessage: displayMessage ?? "Неизвестная ошибка",
            errorType: ErrorTypesEnum.Warning
        };
    }

    /**
     * Метод создаёт модель обычной ошибки. 
     * @param displayMessage Сообщение для отображения в интерфейсе. Может быть пустым.
     * @returns Модель ошибки.
     */
    static commonError(displayMessage: string | null): IError {
        return {
            displayMessage: displayMessage ?? "Неизвестная ошибка",
            errorType: ErrorTypesEnum.Error
        };
    }

    /**
     * Метод проверяет данные на наличие ошибки
     * @param data Данные необходимые для проверки
     * @returns Является ли data IError
     */
    static isError(data: any): data is IError {

        if(typeof (data) === "string") {
            return false
        }
        // noinspection RedundantIfStatementJS
        if (!("errorType" in data) || !("displayMessage" in data)) {
            return false
        }

        return true
    }

    /**
     * Метод для обработки ошибок в запросах
     * @param err ошибка запроса
     * @returns ошибку типа IError
     */
    static returnErrorFromServices(err: any): IError {
        if (err.isAxiosError) {
            const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

            if (baseErrorResponse === null) {
                return ErrorService.criticalError()
            }

            if (baseErrorResponse.response === undefined) {
                return ErrorService.criticalError()
            }

            return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
        }

        return ErrorService.criticalError()
    }
}