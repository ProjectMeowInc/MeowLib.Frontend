import {IBook} from "./BookModels";

/**
 * Интерфейс описывающий возвращаемое значение тега
 */
export interface ITagModel {
    id: number
    name: string
    description: string
    books: IBook[]
}

/**
 * Интерфейс описывающий entities тега
 */
export interface ITagDto {
    id: number,
    name: string | null
    description: string | null
}