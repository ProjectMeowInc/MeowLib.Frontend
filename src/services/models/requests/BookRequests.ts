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

/**
 * Интерфейс описывающий данные для добавления тегов для книги
 */
export interface IUpdateBookTagsRequest {
    tags: number[]
}