import {IFavoriteBookDTO} from "../DTO/IFavoriteBookDTO";

/**
 * Интерфейс книг пользователя
 */
export interface IGetBooksStatusResponse {
    items: IFavoriteBookDTO[]
}