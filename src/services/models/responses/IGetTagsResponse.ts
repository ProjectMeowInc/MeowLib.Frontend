import {ITagDTO} from "../DTO/ITagDTO";

/**
 * Интерфейс для получения всех тэгов
 */
export interface IGetTagsResponse {
    data: ITagDTO[]
}

/**
 * Интерфейс для получения тэга
 */
export interface IGetTagResponse {
    id: number,
    name: string,
    description: string | null
}