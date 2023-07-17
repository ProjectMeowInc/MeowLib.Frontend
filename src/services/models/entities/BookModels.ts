import {ITagModel} from "./TagModels";
import {IAuthorDto} from "./AuthorModels";

/**
 * Интерфейс описывающий книгу
 */
export interface IBookModel {
    id: number
    name: string
    description: string
    imageUrl: string | null
    author: IAuthorDto | null
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