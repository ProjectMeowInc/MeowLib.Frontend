import {IUserFavoriteDto} from "../DTO/UserFavoriteModels";

/**
 * Интерфейс книг пользователя
 */
export interface IGetUserFavoriteResponse {
    items: IUserFavoriteDto[]
}