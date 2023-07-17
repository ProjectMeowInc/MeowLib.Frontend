/**
 * Интерфейс описывающий entities главы
 */
export interface IChapterDto {
    id: number
    name: string
    releaseDate: Date
}

/**
 * Интерфейс описывающий главу
 */
export interface IChapter extends IChapterDto {
    text: string
}