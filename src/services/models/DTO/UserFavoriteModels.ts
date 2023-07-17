import {UserBookStatus} from "../UserBookStatus";
import {IBookDTO} from "./IBookDTO";

/**
 * Интерфейс описывающий книги в списке пользователя
 */
export interface IUserFavoriteDto {
    status: UserBookStatus
    books: IBookDTO[]
}