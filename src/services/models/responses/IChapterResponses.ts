import {IChapterDTO} from "../DTO/IChapterDTO";

/**
 * Интерфейс описывающий приходящие главы
 */
export interface IGetChapters {
    items: IChapterDTO[]
}