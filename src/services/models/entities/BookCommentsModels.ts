import {IUser} from "./UserModels";

/**
 * Интерфейс описывает IBookCommentsDto
 */
export interface IBookCommentsDto {
    id: number
    text: string
    postedAt: Date
    author: IUser
}