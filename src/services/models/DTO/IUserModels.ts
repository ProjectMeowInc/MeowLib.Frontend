/**
 * Перечесление возможных ролей пользователя.
 */
export enum UserRolesEnum {
    User = "User",
    Editor = "Editor",
    Moderator = "Moderator",
    Admin = "Admin"
}

/**
 * Интерфейс описывающий DTO пользователя
 */
export interface IUserDTO {
    id: number
    login: string
    role: UserRolesEnum
}