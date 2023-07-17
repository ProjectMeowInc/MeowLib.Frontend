import {ITagModel} from "./TagModels";
import {IAuthor} from "./AuthorModels";

/**
 * Интерфейс описывающий книгу
 */
export interface IBook {
    id: number
    name: string
    description: string
    imageUrl: string | null
    author: IAuthor | null
    tags: ITagModel[]
}

/**
 * Интерфейс описывающий entities книги
 */
export interface IBookDto {
    id: number
    name: string
    description: string
    imageName: string | null
}