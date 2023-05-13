/**
 * Интерфейс описывающий тело запроса для логирования в тг
 */
export interface ISendLogRequest {
    errorLog: {
        errorModule: string
        message: string
        additionalInfo?: object
        isApiError: boolean
    }
}