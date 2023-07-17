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
            imageName: string
        }[]
    }[]
}