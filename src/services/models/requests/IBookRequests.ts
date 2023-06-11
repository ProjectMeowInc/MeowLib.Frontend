/**
 * Интерфейс описывающий отправляемые данные для создания книги
 */
export interface ICreateBookRequest {
    name: string
    description: string
}

/**
 * Интерфейс описывающий данные необхолдимые для обновления книги
 */
export interface IUpdateBookRequest {
    name?: string
    description?: string
}