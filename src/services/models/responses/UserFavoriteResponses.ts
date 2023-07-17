import {IUserBooksStatusDTO} from "../DTO/IUserBooksStatusDTO";

/**
 * Интерфейс книг пользователя
 */
export interface IGetUserFavoriteResponse {
    items: IUserBooksStatusDTO[]
}