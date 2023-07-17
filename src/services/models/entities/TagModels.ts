import {IBookModel} from "./BookModels";

/**
 * Интерфейс описывающий возвращаемое значение тега
 */
export interface ITagModel {
    id: number
    name: string
    description: string
    books: IBookModel[]
}

/**
 * Интерфейс описывающий entities тега
 */
export interface ITagDto {
    id: number,
    name: string | null
    description: string | null
}