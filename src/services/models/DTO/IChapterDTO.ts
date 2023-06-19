/**
 * Интерфейс описывающий DTO главы
 */
export interface IChapterDTO {
    id: number
    name: string
    releaseDate: Date
}

/**
 * Интерфейс описывающий главу
 */
export interface IChapter extends IChapterDTO {
    text: string
}