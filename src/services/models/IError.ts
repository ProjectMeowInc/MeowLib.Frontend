import {RedirectService} from "../RedirectService";
import {LogService} from "../LogService";
import {AlertService} from "../AlertService";

/**
 * Перечесление возможных типов ошибок.
 * 
 * - Warning - ошибка не влияет на взаимодействие пользователя с сайтом.
 * - Error - ошибка влияет на взаимодействие пользователя с сайтом.
 * - Critical - критическая ошибка. Что-то, что нельзя контролируемого обработать. Например: неожиданный ответ от сервера.
 */
export enum ErrorTypesEnum {
    Warning,
    Error,
    Critical
}

/**
 * Интерфейс для ошибок. 
 * 
 * Ошибки между сервисами приложения приходят в виде этого интерфейса.
 */
export interface IError {
    displayMessage: string
    errorType: ErrorTypesEnum
}

/**
 * Интерфейс описывающий ошибку с действием
 */
export interface IErrorWithAction extends IError {
    action: "redirect" | "reload"
    param?: string
    execute: () => void
}

/**
 * Класс ошибки с действием
 */
export class ErrorWithAction implements IErrorWithAction {
    action: "redirect" | "reload";
    displayMessage: string;
    errorType: ErrorTypesEnum;
    param?: string

    constructor(action: "redirect" | "reload", displayMessage: string, errorType: ErrorTypesEnum, param?: string) {
        this.action = action
        this.displayMessage = displayMessage
        this.errorType = errorType
        this.param = param
    }

     execute(): void {

        AlertService.errorMessage(this.displayMessage)

        switch (this.action) {
            case "redirect":
                if (this.param !== undefined) {
                    return RedirectService.redirect(this.param)
                }

                RedirectService.redirectToLogin()
                break;

            case "reload":
                RedirectService.reloadPage()
                break;

            default:
                LogService.sendLogAsync({
                    errorLog: {
                        errorModule: "IError",
                        message: "Произошла хуйня: Неизвестное действие",
                        isApiError: false,
                        additionalInfo: {
                            action: this.action
                        }
                    }
                }).then()
                break;
        }
    }


}