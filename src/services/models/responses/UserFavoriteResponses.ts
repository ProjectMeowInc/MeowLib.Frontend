import {IUserFavoriteDto} from "../entities/UserFavoriteModels";

/**
 * Интерфейс книг пользователя
 */
export interface IGetUserFavoriteResponse {
    items: IUserFavoriteDto[]
}