import {ITag} from "./ITagDTO";
import {IAuthorDTO} from "./IAuthorModels";

/**
 * Интерфейс опсиывающий книгу
 */
export interface IBook {
    id: number
    name: string
    description: string
    author: IAuthorDTO
    tags: ITag[]
}

/**
 * Интерфейс опсиывающий DTO книги
 */
export interface IBookDTO {
    id: number
    name: string
    description: string
}