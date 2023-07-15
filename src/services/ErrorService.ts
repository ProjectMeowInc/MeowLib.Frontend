import {Error, IError, IErrorWithAction} from "./models/IError";
import {AxiosError} from "axios";
import {IBaseErrorResponse} from "./models/responses/errors/IBaseErrorResponse";
import {LogService} from "./LogService";

/**
 * Класс для удобного создания ошибок
 */
export class ErrorService {

    /**
     * Метод создаёт модель критической ошибки. 
     * 
     * TODO: Может, стоит добавить логирование таких ошибок на backend.
     * @param displayMessage Сообщение для отображения в интерфейсе. 
     * Для критических ошибок стандартное значение - "Неизвестная критическая ошибка".
     * @returns Модель ошибки.
     */
    static criticalError(displayMessage: string | null = null): IError {
        return new Error(displayMessage ?? "Неизвестная ошибка", "Critical");
    }

    /**
     * Метод создаёт модель warning-ошибки.
     * @param displayMessage Сообщение для отображения в интерфейсе. Может быть пустым.
     * @returns Модель ошибки.
     */
    static warningError(displayMessage: string | null): IError {
        return new Error(displayMessage ?? "Неизвестная ошибка", "Warning");
    }

    /**
     * Метод создаёт модель обычной ошибки. 
     * @param displayMessage Сообщение для отображения в интерфейсе. Может быть пустым.
     * @returns Модель ошибки.
     */
    static commonError(displayMessage: string | null): IError {
        return new Error(displayMessage ?? "Неизвестная ошибка", "Error");
    }

    /**
     * Метод проверяет данные на наличие ошибки
     * @param data Данные необходимые для проверки
     * @returns Является ли data IError
     */
    static isError(data: any): data is IError {

        if (data === null) {
            return false
        }

        if(typeof(data) === "string") {
            return false
        }

        // noinspection RedundantIfStatementJS
        if (!("errorType" in data) || !("displayMessage" in data)) {
            return false
        }

        return true
    }

    /**
     * Метод для проверки действия в ошибке
     * @param data предполагаемая ошибка
     * @returns является ли data IErrorWithAction
     */
    static isActionError(data: IError): data is IErrorWithAction {
        // noinspection RedundantIfStatementJS
        if (!(("action") in data)) {
            return false
        }

        return true
    }

    static toServiceError(err: any, serviceName: string): IError {
        if (err.isAxiosError) {
            const baseErrorResponse = err as AxiosError<IBaseErrorResponse>

            if (baseErrorResponse === null) {
                LogService.sendLogAsync({
                    errorLog: {
                        errorModule: serviceName,
                        message: err.toString(),
                        isApiError: true
                    }
                })
                return ErrorService.criticalError()
            }

            if (baseErrorResponse.response === undefined) {
                return ErrorService.criticalError()
            }

            return ErrorService.commonError(baseErrorResponse.response.data.errorMessage)
        }
        LogService.sendLogAsync({
            errorLog: {
                errorModule: serviceName,
                message: err.toString(),
                isApiError: false
            }
        })

        return ErrorService.criticalError()
    }
}