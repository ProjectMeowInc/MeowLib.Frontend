import {IAuthorDto} from "../entities/AuthorModels";
import {ITagModel} from "../entities/TagModels";
import {IBookDto} from "../entities/BookModels";

/**
 * Интерфейс описывающий возвращаемое занчение книги
 */
interface BookResponse {
    id: number
    name: string
    description: string
    author: IAuthorDto,
    tags: ITagModel[]
}

/**
 * Интерфейс описывающий возвращаемое значение книг
 */
export interface IBooksResponse {
    items: IBookDto[]
}