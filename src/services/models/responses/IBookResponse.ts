import {IAuthorDTO} from "../DTO/IAuthorModels";
import {ITag} from "../DTO/ITagDTO";

/**
 * Интерфейс описывающий возвращаемое занчение книги
 */
interface IBookResponse {
    id: number
    name: string
    description: string
    author: IAuthorDTO,
    tags: ITag[]
}

/**
 * Интерфейс описывающий возвращаемое значение книг
 */
export interface IBooksResponse {
    items: IBookResponse[]
}