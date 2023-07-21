import {IAuthor} from "../entities/AuthorModels";
import {ITagModel} from "../entities/TagModels";
import {IBookDto} from "../entities/BookModels";
import {UserRoles} from "../UserRoles";

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
    items: {
        id: number
        text: string
        postedAt: Date
        author: {
            id: number
            login: string
            role: UserRoles
        }
    }[]
}