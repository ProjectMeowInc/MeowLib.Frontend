/**
 * Интерфейс описывающий значение для создания автора
 */
export interface ICreateAuthorRequest {
    name: string | undefined
}

/**
 * Интерфейс описывающий значение для поиска автора
 */
export interface ISearchAuthorRequest {
    name: string
}