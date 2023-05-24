import {ITagsDTO} from "../DTO/ITagsDTO";

/**
 * Интерфейс для получения всех тэгов
 */
export interface IGetTagsResponse {
    data: ITagsDTO[]
}

/**
 * Интерфейс для получения тэга
 */
export interface IGetTagResponse {
    id: number,
    name: string,
    description: string | null
}