/**
 * Интерфейс для всех ответов-ошибок с backend.
 * 
 * Все ошибки (кроме неожиданных) на backend приходят с полем errorMessage
 */
export interface IBaseErrorResponse {
    errorMessage: string
}