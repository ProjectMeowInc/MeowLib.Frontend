import {RedirectService} from "../RedirectService";
import {LogService} from "../LogService";
import {AlertService} from "../AlertService";
import {IValidationErrorResponse} from "../models/responses/errors/IValidationErrorResponse";

/**
 * Перечесление возможных типов ошибок.
 * 
 * - Warning - ошибка не влияет на взаимодействие пользователя с сайтом.
 * - Error - ошибка влияет на взаимодействие пользователя с сайтом.
 * - Critical - критическая ошибка. Что-то, что нельзя контролируемого обработать. Например: неожиданный ответ от сервера.
 */
export type ErrorTypes = "Warning" | "Error" | "Critical"

/**
 * Интерфейс для ошибок. 
 * 
 * Ошибки между сервисами приложения приходят в виде этого интерфейса.
 */
export interface IError {
    displayMessage: string
    errorType: ErrorTypes
    catchError: () => void
    isHttpError(): this is HttpError
}

/**
 * Интерфейс описывающий ошибку с действием
 */
export interface IErrorWithAction extends IError {
    action: "redirect" | "reload"
    param?: string
    execute: () => void
}

export class Error implements IError {
    displayMessage: string
    errorType: ErrorTypes

    constructor(displayMessage: string, errorType: ErrorTypes) {
        this.displayMessage = displayMessage
        this.errorType = errorType
    }

    catchError(): void {
        if (this.errorType === "Warning") {
            AlertService.warningMessage(this.displayMessage)
            return
        }

        if (this.errorType === "Error") {
            AlertService.warningMessage(this.displayMessage)
            return
        }

        if (this.errorType === "Critical") {
            AlertService.errorMessage(this.displayMessage)
        }
    }

    isHttpError(): this is HttpError {
        if (typeof(this) === "string") {
            return false;
        }

        return "statusCode" in this && "content" in this
    }
}

/**
 * Класс ошибки с действием
 */
export class ErrorWithAction implements IErrorWithAction {
    action: "redirect" | "reload";
    displayMessage: string;
    errorType: ErrorTypes;
    param?: string

    constructor(action: "redirect" | "reload", displayMessage: string, errorType: ErrorTypes, param?: string) {
        this.action = action
        this.displayMessage = displayMessage
        this.errorType = errorType
        this.param = param
    }

    catchError(): void {
        this.execute()
    }

     execute(): void {

        AlertService.errorMessage(this.displayMessage)

        switch (this.action) {
            case "redirect":
                if (this.param !== undefined) {
                    return RedirectService.redirect(this.param)
                }
                break;

            case "reload":
                RedirectService.reloadPage()
                break;

            default:
                LogService.sendLogAsync({
                    errorLog: {
                        errorModule: "IError",
                        message: "Произошло: Неизвестное действие",
                        isApiError: false,
                        additionalInfo: {
                            action: this.action
                        }
                    }
                }).then()
                break;
        }
    }

    isHttpError(): this is HttpError {
        return false;
    }
}

export class HttpError<TContent = any> extends Error {

    statusCode: number
    content: TContent

    constructor(displayMessage: string, statusCode: number, content: TContent) {
        super(displayMessage, "Error");
        this.statusCode = statusCode
        this.content = content
    }

    public isValidationErrorResponse(): this is HttpError<IValidationErrorResponse> {
        return this instanceof(HttpError<IValidationErrorResponse>)
    }
}