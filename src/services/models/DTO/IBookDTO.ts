import {ITag} from "./ITagDTO";
import {IAuthorDTO} from "./IAuthorModels";

/**
 * Интерфейс опсиывающий книгу
 */
export interface IBook {
    id: number
    name: string
    description: string
    imageUrl: string | null
    author: IAuthorDTO | null
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