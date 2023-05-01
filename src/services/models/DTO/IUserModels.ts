/**
 * Перечесление возможных ролей пользователя.
 */
export enum UserRolesEnum {
    User,
    Editor,
    Moderator,
    Admin
}

/**
 * Интерфейс описывающий информацию хранащуюся в токене.
 */
export interface ITokenData {
    id: number,
    login: string,
    role: UserRolesEnum
}