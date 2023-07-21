import {UserRoles} from "../UserRoles";

export interface IAddBookCommentResponse {
    id: number
    text: string
    postedAt: Date
    author: {
        id: number
        login: string
        role: UserRoles
    }
}