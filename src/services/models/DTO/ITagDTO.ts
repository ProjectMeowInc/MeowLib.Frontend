/**
 * Интерфейс описывающий врзвращаемое значение тэга
 */
export interface  ITag {
    id: number
    name: string
    description: string
    books: string[]
}

/**
 * Интерфейс описывающий DTO тэга
 */
export interface ITagDTO {
    id: number,
    name: string | null
    description: string | null
}