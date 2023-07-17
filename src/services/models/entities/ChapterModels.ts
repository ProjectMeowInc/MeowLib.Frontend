/**
 * Интерфейс описывающий главу
 */
export interface IChapter {
    id: number
    name: string
    releaseDate: Date
    text: string
}

/**
 * Интерфейс описывающий entities главы
 */
export interface IChapterDto {
    id: number
    name: string
    releaseDate: Date
}