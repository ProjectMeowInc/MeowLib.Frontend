/**
 * Интерфес для запроса на создание тэга
 */
export interface ICreateTagRequest {
    name: string,
    description?: string
}

/**
 * Интерфейс для запроса на обновление тэга
 */
export interface IUpdateTagRequest {
    id: number
    name: string | null,
    description: string | null
}