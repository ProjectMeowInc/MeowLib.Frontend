import {IAuthor} from "../entities/AuthorModels";
import {ITagModel} from "../entities/TagModels";
import {IBookDto} from "../entities/BookModels";
import {IBookCommentsDto} from "../entities/BookCommentsModels";

/**
 * Интерфейс описывающий возвращаемое значение книги
 */
interface BookResponse {
    id: number
    name: string
    description: string
    author: IAuthor,
    tags: ITagModel[]
}

/**
 * Интерфейс описывающий возвращаемое значение книг
 */
export interface IBooksResponse {
    items: IBookDto[]
}

/**
 * Интерфейс описывающий возвращаемое значение комментариев к книгам
 */
export interface IGetBookCommentsResponse {
    bookId: number
    items: IBookCommentsDto[]
}