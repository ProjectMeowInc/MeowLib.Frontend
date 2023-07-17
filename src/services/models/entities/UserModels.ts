import {UserRoles} from "../UserRoles";

/**
 * Интерфейс описывающий entities пользователя
 */
export interface IUserDto {
    id: number
    login: string
    role: UserRoles
}