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
 * Интерфейс описывающий информацию хранащуюся в токене.
 */
export interface ITokenData {
    id: number,
    login: string,
    role: UserRolesEnum
}

/**
 * Интерфейс описывающий DTO пользователя
 */
export interface IUserDTO {
    id: number
    login: string
    role: UserRolesEnum
}