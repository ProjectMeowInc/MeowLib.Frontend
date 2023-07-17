import {ITagDto} from "../entities/TagModels";

/**
 * Интерфейс для получения всех тэгов
 */
export interface GetTagsResponse {
    data: ITagDto[]
}

/**
 * Интерфейс для получения тэга
 */
export interface IGetTagResponse {
    id: number,
    name: string,
    description: string | null
}