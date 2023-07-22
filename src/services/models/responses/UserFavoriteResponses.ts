import {UserBookStatus} from "../UserBookStatus";


/**
 * Ответ на получение списка книг пользователя
 */
export interface IGetUserFavoriteResponse {
    items: {
        status: UserBookStatus
        books: {
            id: number
            name: string
            description: string
            imageName: string | null
        }[]
    }[]
}

export interface IGetUserFavoriteByIdResponse {
    status: UserBookStatus
    book: {
        id: number
        name: string
        description: string
        imageName: string | null
    }
}