import {IAuthorDTO} from "../DTO/IAuthorModels";
import {ITag} from "../DTO/ITagDTO";
import {IBookDTO} from "../DTO/IBookDTO";

/**
 * Интерфейс описывающий возвращаемое занчение книги
 */
interface BookResponse {
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
    items: IBookDTO[]
}