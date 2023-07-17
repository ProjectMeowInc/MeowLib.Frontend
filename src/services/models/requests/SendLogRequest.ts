/**
 * Интерфейс описывающий тело запроса для логирования в тг
 */
export interface SendLogRequest {
    errorLog: {
        errorModule: string
        message: string
        isApiError: boolean
        additionalInfo?: object
    }
}