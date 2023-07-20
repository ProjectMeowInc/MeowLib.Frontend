import {IChapterDto} from "../entities/ChapterModels";

/**
 * Интерфейс описывающий возвращаемый список глав
 */
export interface IGetChaptersResponse {
    items: {
        id: number
        name: string
        releaseDate: string
    }[]
}