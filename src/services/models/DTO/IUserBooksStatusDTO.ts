import {UserBookStatus} from "../UserBookStatus";
import {IBookDTO} from "./IBookDTO";

/**
 * Интерфейс описывающий книги пользователя с определённым статусом
 */
export interface IUserBooksStatusDTO {
    status: UserBookStatus
    books: IBookDTO[]
}