import { IBaseErrorResponse } from "./IBaseErrorResponse";

/**
 * Модель ошибки валидации.
 */
interface IValidationErrorModel {
    propertyName: string,
    message: string
}

/**
 * Интерфейс для ошибок, связанных с ошибкой валидации.
 * 
 * validationErrors - список ошибок.
 */
export interface IValidationErrorResponse extends IBaseErrorResponse {
    validationErrors: IValidationErrorModel[]
}