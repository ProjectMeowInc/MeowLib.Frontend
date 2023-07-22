import {UserBookStatus} from "../UserBookStatus";
import {IBookDto} from "./BookModels";

/**
 * Интерфейс описывающий книги в списке пользователя
 */
export interface IUserFavorites {
    status: UserBookStatus
    books: IBookDto[]
}

export interface IUserFavorite {
    status: UserBookStatus
    book: IBookDto
}