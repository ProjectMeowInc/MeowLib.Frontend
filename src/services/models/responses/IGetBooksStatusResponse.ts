import {IUserBooksStatusDTO} from "../DTO/IUserBooksStatusDTO";

/**
 * Интерфейс книг пользователя
 */
export interface IGetBooksStatusResponse {
    items: IUserBooksStatusDTO[]
}