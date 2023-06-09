import {IAuthorDTO} from "../DTO/IAuthorModels";

/**
 * Интерфейс описывающий возвращаемое значение get запроса для авторов
 */
export interface IGetAuthorsResponse {
    data: IAuthorDTO[]
}