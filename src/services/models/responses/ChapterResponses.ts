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