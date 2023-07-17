import {UserRoles} from "../UserRoles";

/**
 * Интерфейс описывающий entities пользователя
 */
export interface IUser {
    id: number
    login: string
    role: UserRoles
}