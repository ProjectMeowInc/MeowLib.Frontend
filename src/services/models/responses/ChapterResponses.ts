import {IChapterDTO} from "../DTO/IChapterDTO";

/**
 * Интерфейс описывающий возвращаемый список глав
 */
export interface IGetChaptersResponse {
    items: IChapterDTO[]
}