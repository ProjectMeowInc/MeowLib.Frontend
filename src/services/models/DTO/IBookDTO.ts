import {IAuthorDTO} from "./IAuthorModels";
import {ITag} from "./ITagDTO";

/**
 * Интерфейс опсиывающий книгу
 */
export interface IBook {
    id: number
    name: string
    description: string
    authors: IAuthorDTO[]
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