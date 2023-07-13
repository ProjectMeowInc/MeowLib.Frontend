import {ITag} from "./ITagDTO";
import {IAuthorDTO} from "./IAuthorModels";

/**
 * Интерфейс описывающий книгу
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
 * Интерфейс описывающий DTO книги
 */
export interface IBookDTO {
    id: number
    name: string
    description: string
    imageName: string | null
}