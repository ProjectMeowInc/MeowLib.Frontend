/**
 * Интерфейс описывающий DTO главы
 */
export interface IChapterDTO {
    id: number
    name: string
    releaseDate: string
}

/**
 * Интерфейс описывающий главу
 */
export interface IChapter extends IChapterDTO {
    text: string
}