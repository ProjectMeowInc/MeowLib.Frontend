import {UserBookStatus} from "../UserBookStatus";

export interface ICreateUserFavoriteRequest {
    bookId: number
    status: UserBookStatus
}