import {IAuthor} from "../entities/AuthorModels";

/**
 * Интерфейс описывающий возвращаемое значение get запроса для авторов
 */
export interface IGetAuthorsResponse {
    data: IAuthor[]
}