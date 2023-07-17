import {UserBookStatus} from "../UserBookStatus";
import {IBookDto} from "./BookModels";

/**
 * Интерфейс описывающий книги в списке пользователя
 */
export interface IUserFavoriteDto {
    status: UserBookStatus
    books: IBookDto[]
}