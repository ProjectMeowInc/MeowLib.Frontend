import {UserRoles} from "../UserRoles";

/**
 * Интерфейс описывающий DTO пользователя
 */
export interface IUserDTO {
    id: number
    login: string
    role: UserRoles
}