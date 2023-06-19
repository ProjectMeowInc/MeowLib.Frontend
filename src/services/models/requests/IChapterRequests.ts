/**
 * Интерфейс описывающий данные необходимые для создания главы
 */
export interface ICreateChapterRequest {
    name: string
    text: string
}

/**
 * Интерфейс описывающий данные необходимые для обновления главы
 */
export interface IUpdateChapterTextRequest {
    text: string
}